import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Logo } from "../components/Logo";
import { COLORS } from "../theme";

const FONT_FAMILY =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/**
 * Scene 1 — Intro card. Logo springs in, wordmark + tagline fade up.
 */
export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo: scale from 0.6 → 1.0 with overshoot, then settle.
  const logoScale = interpolate(frame, [0, 0.7 * fps], [0.6, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoOpacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Wordmark: fades up after logo, with a small Y offset.
  const wordmarkProgress = interpolate(frame, [0.5 * fps, 1.1 * fps], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const wordmarkY = interpolate(wordmarkProgress, [0, 1], [16, 0]);

  // Tagline: fades up last.
  const taglineProgress = interpolate(frame, [0.9 * fps, 1.5 * fps], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(taglineProgress, [0, 1], [12, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(60% 50% at 50% 35%, rgba(255, 138, 51, 0.18) 0%, ${COLORS.bg} 70%)`,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <Logo size={220} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 96,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              color: COLORS.fg,
              opacity: wordmarkProgress,
              transform: `translateY(${wordmarkY}px)`,
            }}
          >
            Polymind
          </h1>

          <p
            style={{
              margin: 0,
              fontSize: 40,
              color: COLORS.fgMuted,
              letterSpacing: "-0.02em",
              opacity: taglineProgress,
              transform: `translateY(${taglineY}px)`,
            }}
          >
            One prompt. Every top AI. Pick the best.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
