import { and, eq, gt, sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { credits, creditLedger } from '@/db/schema';
import { IS_BETA, BETA_SIGNUP_BONUS } from '@/lib/beta';

export const SIGNUP_BONUS = IS_BETA ? BETA_SIGNUP_BONUS : 25;
export const CREDITS_PER_STARTER_PACK = 25;
export const CREDITS_PER_PRO_PACK = 75;

export type LedgerReason =
  | 'signup_bonus'
  | 'purchase'
  | 'turn_consumed'
  | 'refund'
  | 'admin_grant';

export async function getBalance(userId: string): Promise<number> {
  const rows = await db
    .select({ balance: credits.balance })
    .from(credits)
    .where(eq(credits.userId, userId))
    .limit(1);
  return rows[0]?.balance ?? 0;
}

/**
 * Add credits to a user. Idempotent on (userId, reference) to safely retry
 * webhook deliveries — the same order_id won't grant twice.
 */
export async function addCredits(
  userId: string,
  amount: number,
  reason: LedgerReason,
  reference?: string
): Promise<{ added: boolean; balance: number }> {
  return db.transaction(async (tx) => {
    if (reference) {
      const existing = await tx
        .select({ id: creditLedger.id })
        .from(creditLedger)
        .where(
          and(
            eq(creditLedger.userId, userId),
            eq(creditLedger.reason, reason),
            eq(creditLedger.reference, reference)
          )
        )
        .limit(1);
      if (existing[0]) {
        const balance = await tx
          .select({ balance: credits.balance })
          .from(credits)
          .where(eq(credits.userId, userId))
          .limit(1);
        return { added: false, balance: balance[0]?.balance ?? 0 };
      }
    }

    const purchaseDelta = reason === 'purchase' ? amount : 0;
    const [row] = await tx
      .insert(credits)
      .values({ userId, balance: amount, totalPurchased: purchaseDelta })
      .onConflictDoUpdate({
        target: credits.userId,
        set: {
          balance: sql`${credits.balance} + ${amount}`,
          totalPurchased: sql`${credits.totalPurchased} + ${purchaseDelta}`,
          updatedAt: sql`now()`,
        },
      })
      .returning({ balance: credits.balance });

    await tx.insert(creditLedger).values({
      userId,
      delta: amount,
      reason,
      reference: reference ?? null,
    });

    return { added: true, balance: row.balance };
  });
}

/**
 * Atomically deduct one credit. Returns new balance on success, or null when
 * the user has no remaining credits.
 */
export async function deductOneCredit(
  userId: string,
  reason: LedgerReason = 'turn_consumed',
  reference?: string
): Promise<number | null> {
  return db.transaction(async (tx) => {
    const result = await tx
      .update(credits)
      .set({ balance: sql`${credits.balance} - 1`, updatedAt: sql`now()` })
      .where(and(eq(credits.userId, userId), gt(credits.balance, 0)))
      .returning({ balance: credits.balance });

    if (result.length === 0) return null;

    await tx.insert(creditLedger).values({
      userId,
      delta: -1,
      reason,
      reference: reference ?? null,
    });

    return result[0].balance;
  });
}
