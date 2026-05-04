import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/db/schema';

export type User = typeof users.$inferSelect;

export async function getUserByEmail(email: string): Promise<User | null> {
  const rows = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return rows[0] ?? null;
}

export async function createUser(email: string, passwordHash: string): Promise<User> {
  const [row] = await db
    .insert(users)
    .values({ email, passwordHash })
    .returning();
  return row;
}
