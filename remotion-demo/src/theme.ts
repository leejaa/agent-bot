/**
 * Brand tokens copied from the Polymind app's design system. Keep in sync
 * with `agent-bot/src/app/globals.css` if those values change.
 */

export const COLORS = {
  primary: "#ff8a33", // Coral Burst
  bg: "#f6f5f4", // Ghost White (page background)
  bgElevated: "#ffffff", // Paper White
  fg: "#0b0b0b", // Deep Graphite
  fgMuted: "#615d59", // Deep Slate
  fgFaint: "#c6c6c5", // Cool Gray
  border: "rgba(0, 0, 0, 0.08)",
  borderFaint: "rgba(0, 0, 0, 0.06)",
  borderStrong: "rgba(0, 0, 0, 0.16)",
} as const;

export const FPS = 30;

/** Frame counts per scene (sum = 900 = 30s). */
export const SCENE_FRAMES = {
  intro: 90, // 3.0s
  empty: 60, // 2.0s
  typing: 90, // 3.0s
  streaming: 480, // 16.0s — the main event
  done: 90, // 3.0s
  outro: 90, // 3.0s
} as const;

export const TOTAL_FRAMES = Object.values(SCENE_FRAMES).reduce((a, b) => a + b, 0);
