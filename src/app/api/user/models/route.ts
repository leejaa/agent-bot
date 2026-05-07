import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { z } from 'zod';
import {
  getUserModelSelection,
  setUserModelSelection,
  type UserModelSelection,
} from '@/db/queries/userModelSelection';
import { getAvailableModels } from '@/lib/pricing';
import { getModels, type ProviderKey } from '@/lib/models';

export const runtime = 'nodejs';

const SLOTS: ProviderKey[] = ['openai', 'anthropic', 'google'];

/**
 * GET — return current per-slot selection (with default fallback resolved)
 *       and the catalog of selectable models.
 */
export async function GET() {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [selection, defaults, available] = await Promise.all([
    getUserModelSelection(userId),
    getModels(),
    getAvailableModels(),
  ]);

  // Resolve null slots to provider defaults so the client always knows what's
  // actually being used right now.
  const resolved = SLOTS.map((slot, i) => {
    const slotKey = (`slot${i + 1}`) as 'slot1' | 'slot2' | 'slot3';
    const userSelected = selection[slotKey];
    const defaultEntry = defaults.find((d) => d.key === slot);
    const id = userSelected ?? defaultEntry?.modelId ?? null;
    const meta = available.find((m) => m.id === id);
    return {
      slot,
      slotKey,
      modelId: id,
      isDefault: !userSelected,
      defaultModelId: defaultEntry?.modelId ?? null,
      meta: meta
        ? {
            id: meta.id,
            name: meta.name,
            provider: meta.provider,
            description: meta.description,
            pricing: meta.pricing,
          }
        : null,
    };
  });

  return NextResponse.json({
    slots: resolved,
    available: available.map((m) => ({
      id: m.id,
      name: m.name,
      provider: m.provider,
      description: m.description,
      pricing: m.pricing,
    })),
  });
}

const putSchema = z.object({
  slot1: z.string().nullable(),
  slot2: z.string().nullable(),
  slot3: z.string().nullable(),
});

/** PUT — replace the user's selection. Pass `null` for any slot to revert. */
export async function PUT(req: Request) {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = putSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

  // Validate any non-null slots reference a real chat-capable gateway model.
  const available = await getAvailableModels();
  const validIds = new Set(available.map((m) => m.id));
  for (const v of [parsed.data.slot1, parsed.data.slot2, parsed.data.slot3]) {
    if (v !== null && !validIds.has(v)) {
      return NextResponse.json({ error: `Unknown model: ${v}` }, { status: 400 });
    }
  }

  const next: UserModelSelection = {
    slot1: parsed.data.slot1,
    slot2: parsed.data.slot2,
    slot3: parsed.data.slot3,
  };
  await setUserModelSelection(userId, next);

  return NextResponse.json({ ok: true, selection: next });
}
