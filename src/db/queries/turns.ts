import { and, asc, eq, gt, sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { conversations, creditLedger, credits, turns } from '@/db/schema';
import { readAllUsage, clearUsage } from '@/lib/turnUsage';
import { usdToCredits } from '@/lib/pricing';

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
  turnId: string;
  userMessage: string;
  openaiResponse: string | null;
  anthropicResponse: string | null;
  googleResponse: string | null;
};

/**
 * Single transaction:
 *  1. Read per-slot token usage from Redis (stashed by chat APIs).
 *  2. Compute total cost in USD → credits via usdToCredits().
 *  3. Insert the turn row with token/cost/credit accounting.
 *  4. Bump the conversation's updated_at, auto-title if empty.
 *  5. Atomically deduct that many credits and append a ledger entry.
 *
 * If credit deduction fails (balance was already 0 due to a race), we still
 * persist the turn — the user received the responses, so we record them.
 *
 * The Redis usage entries are cleared after the turn is saved.
 */
export async function saveTurnAndTouchConversation(input: SaveTurnInput): Promise<Turn> {
  const usage = await readAllUsage(input.turnId);

  const inputTokensTotal =
    (usage.openai?.inputTokens ?? 0) +
    (usage.anthropic?.inputTokens ?? 0) +
    (usage.google?.inputTokens ?? 0);
  const outputTokensTotal =
    (usage.openai?.outputTokens ?? 0) +
    (usage.anthropic?.outputTokens ?? 0) +
    (usage.google?.outputTokens ?? 0);
  const costUsd =
    (usage.openai?.costUsd ?? 0) +
    (usage.anthropic?.costUsd ?? 0) +
    (usage.google?.costUsd ?? 0);
  const creditsToCharge = usdToCredits(costUsd);

  const turn = await db.transaction(async (tx) => {
    const [row] = await tx
      .insert(turns)
      .values({
        conversationId: input.conversationId,
        userMessage: input.userMessage,
        openaiResponse: input.openaiResponse,
        anthropicResponse: input.anthropicResponse,
        googleResponse: input.googleResponse,
        inputTokensTotal: inputTokensTotal || null,
        outputTokensTotal: outputTokensTotal || null,
        costUsd: costUsd > 0 ? costUsd.toFixed(6) : null,
        creditsCharged: creditsToCharge,
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
      .set({
        balance: sql`${credits.balance} - ${creditsToCharge}`,
        updatedAt: sql`now()`,
      })
      .where(and(eq(credits.userId, input.userId), gt(credits.balance, 0)))
      .returning({ balance: credits.balance });

    if (deducted.length > 0) {
      await tx.insert(creditLedger).values({
        userId: input.userId,
        delta: -creditsToCharge,
        reason: 'turn_consumed',
        reference: `turn:${row.id}`,
      });
    }

    return row;
  });

  // Best-effort cleanup; loss is tolerable since entries auto-expire in 120s.
  clearUsage(input.turnId).catch(() => {});

  return turn;
}
