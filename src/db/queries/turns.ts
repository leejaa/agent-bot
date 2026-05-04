import { and, asc, eq, gt, sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { conversations, creditLedger, credits, turns } from '@/db/schema';

export type Turn = typeof turns.$inferSelect;

export async function listTurnsByConversation(conversationId: string): Promise<Turn[]> {
  return db
    .select()
    .from(turns)
    .where(eq(turns.conversationId, conversationId))
    .orderBy(asc(turns.createdAt));
}

type SaveTurnInput = {
  userId: string;
  conversationId: string;
  userMessage: string;
  openaiResponse: string | null;
  anthropicResponse: string | null;
  googleResponse: string | null;
};

/**
 * Single transaction:
 *  1. Insert the turn row.
 *  2. Bump the conversation's updated_at, auto-title if empty.
 *  3. Atomically deduct one credit (if user has balance > 0) and append a ledger entry.
 *
 * If credit deduction fails (balance was already 0 due to a race), we still
 * persist the turn — the user received the responses, so we record them.
 */
export async function saveTurnAndTouchConversation(input: SaveTurnInput): Promise<Turn> {
  return db.transaction(async (tx) => {
    const [turn] = await tx
      .insert(turns)
      .values({
        conversationId: input.conversationId,
        userMessage: input.userMessage,
        openaiResponse: input.openaiResponse,
        anthropicResponse: input.anthropicResponse,
        googleResponse: input.googleResponse,
      })
      .returning();

    const autoTitle = input.userMessage.slice(0, 60);
    await tx
      .update(conversations)
      .set({
        updatedAt: sql`now()`,
        title: sql`coalesce(${conversations.title}, ${autoTitle})`,
      })
      .where(eq(conversations.id, input.conversationId));

    const deducted = await tx
      .update(credits)
      .set({ balance: sql`${credits.balance} - 1`, updatedAt: sql`now()` })
      .where(and(eq(credits.userId, input.userId), gt(credits.balance, 0)))
      .returning({ balance: credits.balance });

    if (deducted.length > 0) {
      await tx.insert(creditLedger).values({
        userId: input.userId,
        delta: -1,
        reason: 'turn_consumed',
        reference: `turn:${turn.id}`,
      });
    }

    return turn;
  });
}
