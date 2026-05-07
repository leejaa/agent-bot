import 'server-only';
import { redis } from '@/lib/redis';
import type { ProviderKey } from '@/lib/models';

/**
 * Per-turn usage cache. The 3 chat APIs each write their token usage + cost
 * to Redis keyed by the client-supplied turn id; the turn-save API later
 * reads all 3 to compute exact credit deduction. Entries auto-expire.
 */

export type TurnUsageEntry = {
  modelId: string;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
};

const TTL_SECONDS = 120;

function key(turnId: string, provider: ProviderKey): string {
  return `usage:${turnId}:${provider}`;
}

export async function stashUsage(
  turnId: string,
  provider: ProviderKey,
  entry: TurnUsageEntry
): Promise<void> {
  await redis.set(key(turnId, provider), JSON.stringify(entry), 'EX', TTL_SECONDS);
}

export async function readAllUsage(
  turnId: string
): Promise<Partial<Record<ProviderKey, TurnUsageEntry>>> {
  const providers: ProviderKey[] = ['openai', 'anthropic', 'google'];
  const raws = await redis.mget(...providers.map((p) => key(turnId, p)));

  const out: Partial<Record<ProviderKey, TurnUsageEntry>> = {};
  providers.forEach((p, i) => {
    const raw = raws[i];
    if (!raw) return;
    try {
      out[p] = JSON.parse(raw) as TurnUsageEntry;
    } catch {
      // ignore malformed entry
    }
  });
  return out;
}

export async function clearUsage(turnId: string): Promise<void> {
  const providers: ProviderKey[] = ['openai', 'anthropic', 'google'];
  await redis.del(...providers.map((p) => key(turnId, p)));
}
