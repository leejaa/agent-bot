import { and, desc, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { conversations } from '@/db/schema';

export type Conversation = typeof conversations.$inferSelect;
export type ConversationListItem = Pick<Conversation, 'id' | 'title' | 'updatedAt'>;

export async function listConversationsForUser(userId: string, limit = 50): Promise<ConversationListItem[]> {
  return db
    .select({
      id: conversations.id,
      title: conversations.title,
      updatedAt: conversations.updatedAt,
    })
    .from(conversations)
    .where(eq(conversations.userId, userId))
    .orderBy(desc(conversations.updatedAt))
    .limit(limit);
}

export async function getConversationById(id: string, userId: string): Promise<Conversation | null> {
  const rows = await db
    .select()
    .from(conversations)
    .where(and(eq(conversations.id, id), eq(conversations.userId, userId)))
    .limit(1);
  return rows[0] ?? null;
}

export async function createConversation(userId: string, title: string | null): Promise<Conversation> {
  const [row] = await db
    .insert(conversations)
    .values({ userId, title })
    .returning();
  return row;
}

export async function deleteConversation(id: string, userId: string): Promise<void> {
  await db
    .delete(conversations)
    .where(and(eq(conversations.id, id), eq(conversations.userId, userId)));
}
