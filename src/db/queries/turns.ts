import { asc, eq, sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { conversations, turns } from '@/db/schema';

export type Turn = typeof turns.$inferSelect;

export async function listTurnsByConversation(conversationId: string): Promise<Turn[]> {
  return db
    .select()
    .from(turns)
    .where(eq(turns.conversationId, conversationId))
    .orderBy(asc(turns.createdAt));
}

type SaveTurnInput = {
  conversationId: string;
  userMessage: string;
  openaiResponse: string | null;
  anthropicResponse: string | null;
  googleResponse: string | null;
};

/**
 * Insert a turn, bump the conversation's updated_at, and auto-title if empty —
 * all in one transaction so partial writes can't happen.
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

    return turn;
  });
}
