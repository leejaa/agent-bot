/**
 * Single source of truth for the AI models that Polymind compares.
 * Every comparison / alternative page pulls from this file so the model
 * positioning stays consistent across the entire pSEO surface.
 */

export type AIModelId = 'gpt' | 'claude' | 'gemini';

export type AIModel = {
  id: AIModelId;
  /** Full marketed name as of the last review. */
  name: string;
  /** Short label used in tables and inline copy. */
  shortName: string;
  vendor: string;
  vendorUrl: string;
  /** Free-form context window description (e.g. "200K tokens"). */
  contextWindow: string;
  /** "full" = strong native multimodal (image + audio); "partial" = images only; "no" = text-only. */
  multimodal: 'full' | 'partial' | 'no';
  /** One-line positioning statement. */
  highlight: string;
  /** Default brand color (used in subtle accents, never as text on white). */
  brandColor: string;
};

export const MODELS: Record<AIModelId, AIModel> = {
  gpt: {
    id: 'gpt',
    name: 'GPT-5.5',
    shortName: 'GPT',
    vendor: 'OpenAI',
    vendorUrl: 'https://openai.com',
    contextWindow: '256K tokens',
    multimodal: 'full',
    highlight: 'Broadest ecosystem and most mature tool-use; best at structured reasoning under tool calls.',
    brandColor: '#10a37f',
  },
  claude: {
    id: 'claude',
    name: 'Claude Opus 4.7',
    shortName: 'Claude',
    vendor: 'Anthropic',
    vendorUrl: 'https://anthropic.com',
    contextWindow: '200K tokens',
    multimodal: 'partial',
    highlight: 'Best long-form writing, code review judgment, and instruction-following discipline.',
    brandColor: '#cc785c',
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini 3 Pro',
    shortName: 'Gemini',
    vendor: 'Google DeepMind',
    vendorUrl: 'https://deepmind.google',
    contextWindow: '2M tokens',
    multimodal: 'full',
    highlight: 'Massive context, native multimodal, deep Google Workspace integration, lowest cost per token.',
    brandColor: '#4285f4',
  },
};

export function getModel(id: AIModelId): AIModel {
  return MODELS[id];
}

export function allModels(): AIModel[] {
  return Object.values(MODELS);
}
