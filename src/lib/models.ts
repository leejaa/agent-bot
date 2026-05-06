import { cache } from 'react';
import { gateway } from 'ai';

export type ProviderKey = 'openai' | 'anthropic' | 'google';

export type ModelEntry = {
  key: ProviderKey;
  modelId: string;
  displayName: string;
};

/** Last-known good lineup; used when the gateway is unreachable or returns nothing matching. */
export const FALLBACK_MODELS: readonly ModelEntry[] = [
  { key: 'openai', modelId: 'openai/gpt-5.5', displayName: 'GPT-5.5' },
  { key: 'anthropic', modelId: 'anthropic/claude-opus-4.7', displayName: 'Claude Opus 4.7' },
  { key: 'google', modelId: 'google/gemini-3-pro-preview', displayName: 'Gemini 3 Pro' },
];

const TTL_MS = 60 * 60 * 1000; // 1 hour
const FETCH_TIMEOUT_MS = 3000;

let memCache: { data: ModelEntry[]; at: number } | null = null;

/**
 * Pull the freshest "general-purpose top tier" model per provider from the
 * AI Gateway listing. Falls back to FALLBACK_MODELS on any failure.
 *
 * Cached in-process for 1 hour. Wrapped in React's `cache()` so a single
 * request that asks for models from multiple places only pays for one fetch.
 */
async function fetchLatest(): Promise<ModelEntry[]> {
  if (memCache && Date.now() - memCache.at < TTL_MS) return memCache.data;

  try {
    const res = await Promise.race([
      gateway.getAvailableModels(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('AI Gateway model listing timed out')), FETCH_TIMEOUT_MS)
      ),
    ]);
    const ids = res.models.map((m) => m.id);

    const openaiId = pickLatest(ids, {
      include: /^openai\/gpt-/,
      exclude: /(mini|nano|chat|codex|image|oss|safeguard|turbo|3\.5)/,
    });
    const anthropicId = pickLatest(ids, {
      include: /^anthropic\/claude-opus-/,
    });
    const googleId = pickLatest(ids, {
      include: /^google\/gemini-.*-pro/,
      exclude: /(image|embedding|imagen|veo|gemma|lite|flash)/,
    });

    if (openaiId && anthropicId && googleId) {
      const data: ModelEntry[] = [
        { key: 'openai', modelId: openaiId, displayName: formatDisplayName(openaiId) },
        { key: 'anthropic', modelId: anthropicId, displayName: formatDisplayName(anthropicId) },
        { key: 'google', modelId: googleId, displayName: formatDisplayName(googleId) },
      ];
      memCache = { data, at: Date.now() };
      return data;
    }
  } catch {
    // intentionally swallowed — fall through to fallback
  }

  return [...FALLBACK_MODELS];
}

export const getModels = cache(fetchLatest);

export function getModel(models: ModelEntry[], key: ProviderKey): ModelEntry {
  const m = models.find((x) => x.key === key);
  if (!m) throw new Error(`Model not configured for provider: ${key}`);
  return m;
}

// ---------- helpers ----------

function pickLatest(
  ids: string[],
  { include, exclude }: { include: RegExp; exclude?: RegExp }
): string | null {
  const matches = ids.filter((id) => include.test(id) && !(exclude && exclude.test(id)));
  if (matches.length === 0) return null;
  matches.sort((a, b) => extractVersion(b) - extractVersion(a));
  return matches[0];
}

function extractVersion(id: string): number {
  const name = id.split('/')[1] ?? id;
  const matches = name.match(/(\d+(?:\.\d+)?)/g);
  if (!matches || matches.length === 0) return 0;
  // Use the first numeric token (typically the major version of the family).
  return parseFloat(matches[0]);
}

function formatDisplayName(id: string): string {
  const [provider, raw] = id.split('/');
  if (!raw) return id;

  if (provider === 'openai') {
    return raw.replace(/^gpt-/, 'GPT-').replace(/-/g, ' ');
  }
  if (provider === 'anthropic') {
    // claude-opus-4.7 → Claude Opus 4.7
    return raw
      .split('-')
      .map((token, i) => (i === 0 ? 'Claude' : capitalize(token)))
      .join(' ');
  }
  if (provider === 'google') {
    // gemini-3-pro-preview → Gemini 3 Pro
    return raw
      .replace(/^gemini-/, 'Gemini ')
      .replace(/-preview$/, '')
      .replace(/-pro/, ' Pro')
      .replace(/-flash/, ' Flash')
      .replace(/-/g, ' ')
      .trim();
  }
  return raw;
}

function capitalize(s: string): string {
  if (!s) return s;
  // Keep number-y tokens as-is
  if (/^\d/.test(s)) return s;
  return s[0].toUpperCase() + s.slice(1);
}
