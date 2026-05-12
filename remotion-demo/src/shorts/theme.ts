export const SHORT_FPS = 30;

/**
 * Frame counts per scene. 6 crossfade transitions × 12 frames each are
 * absorbed by adjacent sequences (+T pattern in ShortsComposition), so the
 * composition's net duration equals the sum of these values: 870 frames = 29s.
 */
export const SHORT_SCENE_FRAMES = {
  hook: 75,    // 2.5s
  prompt: 45,  // 1.5s
  model: 180,  // 6s — used for each of the 3 model scenes
  verdict: 120, // 4s
  cta: 90,     // 3s
} as const;

export const TOTAL_SHORT_FRAMES =
  SHORT_SCENE_FRAMES.hook +
  SHORT_SCENE_FRAMES.prompt +
  SHORT_SCENE_FRAMES.model * 3 +
  SHORT_SCENE_FRAMES.verdict +
  SHORT_SCENE_FRAMES.cta; // = 870

export const SHORT_TRANSITION_FRAMES = 12;

export const SHORT_COLORS = {
  bg: "#0f0f0f",
  surface: "#1c1c1c",
  text: "#ffffff",
  textMuted: "rgba(255,255,255,0.55)",
  textFaint: "rgba(255,255,255,0.28)",
  accent: "#ff8a33",
  // Model brand accents (badge only — not the whole bg)
  gpt: "#10a37f",
  claude: "#c87941",
  gemini: "#4285f4",
} as const;

export const SHORT_FONT =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export type ModelProvider = "gpt" | "claude" | "gemini";

export const MODEL_META: Record<
  ModelProvider,
  { name: string; label: string; color: string }
> = {
  gpt: { name: "GPT-5.5", label: "OpenAI", color: SHORT_COLORS.gpt },
  claude: {
    name: "Claude Opus 4.7",
    label: "Anthropic",
    color: SHORT_COLORS.claude,
  },
  gemini: {
    name: "Gemini 3 Pro",
    label: "Google DeepMind",
    color: SHORT_COLORS.gemini,
  },
};
