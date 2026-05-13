import { cache } from 'react';
import { gateway } from 'ai';

/**
 * Pricing + cost helpers built on top of Vercel AI Gateway's listing.
 *
 * AI Gateway exposes `pricing.input` and `pricing.output` as USD-per-token
 * strings. We normalize to numbers here and provide cost / credit conversion
 * for downstream callers.
 */

export type ModelPricing = {
  modelId: string;
  inputPerToken: number;
  outputPerToken: number;
};

export type AvailableModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
  pricing: ModelPricing | null;
};

/** 1 credit equals this much API spend in USD. */
export const USD_PER_CREDIT = 0.05;

/** Every saved turn charges at least one credit, even on near-zero cost. */
const MIN_CREDITS_PER_TURN = 1;

const TTL_MS = 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 4000;

let memCache: { data: AvailableModel[]; at: number } | null = null;

async function loadModels(): Promise<AvailableModel[]> {
  if (memCache && Date.now() - memCache.at < TTL_MS) return memCache.data;

  try {
    const res = await Promise.race([
      gateway.getAvailableModels(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('AI Gateway listing timed out')), FETCH_TIMEOUT_MS)
      ),
    ]);

    const data: AvailableModel[] = res.models
      .filter((m) => m.modelType === 'language' && !isInternalCodename(m.name ?? m.id))
      .map((m) => ({
        id: m.id,
        name: m.name ?? m.id,
        provider: m.id.split('/')[0] ?? 'unknown',
        description: m.description ?? '',
        pricing: parsePricing(m.id, m.pricing),
      }));

    memCache = { data, at: Date.now() };
    return data;
  } catch {
    // fall through — return whatever was cached previously, else empty
    return memCache?.data ?? [];
  }
}

/** Per-request memoized listing of every chat-capable model on AI Gateway. */
export const getAvailableModels = cache(loadModels);

export async function getPricing(modelId: string): Promise<ModelPricing | null> {
  const models = await getAvailableModels();
  return models.find((m) => m.id === modelId)?.pricing ?? null;
}

export function calcCostUsd(
  pricing: ModelPricing,
  inputTokens: number,
  outputTokens: number
): number {
  return pricing.inputPerToken * inputTokens + pricing.outputPerToken * outputTokens;
}

/** Convert spend to integer credits (rounded up, with a per-turn floor of 1). */
export function usdToCredits(usd: number): number {
  if (!Number.isFinite(usd) || usd <= 0) return MIN_CREDITS_PER_TURN;
  return Math.max(MIN_CREDITS_PER_TURN, Math.ceil(usd / USD_PER_CREDIT));
}

// ---------- internals ----------

// Vercel AI Gateway occasionally surfaces image-generation models or internal
// codename variants (e.g. "Nano Banana") under modelType="language". Filter
// them out so they don't show up in the model picker.
const INTERNAL_CODENAME_RE = /nano.banana|\(.*\bimage\b.*\)/i;
function isInternalCodename(name: string): boolean {
  return INTERNAL_CODENAME_RE.test(name);
}

type RawPricing = { input?: string | number; output?: string | number } | null | undefined;

function parsePricing(modelId: string, raw: RawPricing): ModelPricing | null {
  if (!raw) return null;
  const input = typeof raw.input === 'string' ? parseFloat(raw.input) : raw.input;
  const output = typeof raw.output === 'string' ? parseFloat(raw.output) : raw.output;
  if (!Number.isFinite(input) || !Number.isFinite(output)) return null;
  return { modelId, inputPerToken: input as number, outputPerToken: output as number };
}
