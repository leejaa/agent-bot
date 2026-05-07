import 'server-only';
import { eq, sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { userModelSelections } from '@/db/schema';
import { getModels, type ModelEntry, type ProviderKey } from '@/lib/models';
import { getAvailableModels } from '@/lib/pricing';

export type Slot = 'slot1' | 'slot2' | 'slot3';

export type UserModelSelection = {
  slot1: string | null;
  slot2: string | null;
  slot3: string | null;
};

const EMPTY: UserModelSelection = { slot1: null, slot2: null, slot3: null };

const SLOT_ORDER: ProviderKey[] = ['openai', 'anthropic', 'google'];

/**
 * Resolve the user's effective per-slot model lineup: user override if any,
 * otherwise the provider default. Returns `ModelEntry[]` so consumers stay
 * compatible with the existing chat plumbing.
 */
export async function resolveActiveModels(userId: string): Promise<ModelEntry[]> {
  const [defaults, selection, available] = await Promise.all([
    getModels(),
    getUserModelSelection(userId),
    getAvailableModels(),
  ]);

  return SLOT_ORDER.map((slot, i) => {
    const slotKey = (`slot${i + 1}`) as Slot;
    const userSelected = selection[slotKey];
    const def = defaults.find((d) => d.key === slot)!;
    const modelId = userSelected ?? def.modelId;
    const meta = available.find((m) => m.id === modelId);
    return {
      key: slot,
      modelId,
      displayName: meta?.name ?? def.displayName,
    };
  });
}

export async function getUserModelSelection(userId: string): Promise<UserModelSelection> {
  const rows = await db
    .select({
      slot1: userModelSelections.slot1,
      slot2: userModelSelections.slot2,
      slot3: userModelSelections.slot3,
    })
    .from(userModelSelections)
    .where(eq(userModelSelections.userId, userId))
    .limit(1);
  return rows[0] ?? EMPTY;
}

export async function setUserModelSelection(
  userId: string,
  next: UserModelSelection
): Promise<void> {
  await db
    .insert(userModelSelections)
    .values({
      userId,
      slot1: next.slot1,
      slot2: next.slot2,
      slot3: next.slot3,
    })
    .onConflictDoUpdate({
      target: userModelSelections.userId,
      set: {
        slot1: next.slot1,
        slot2: next.slot2,
        slot3: next.slot3,
        updatedAt: sql`now()`,
      },
    });
}
