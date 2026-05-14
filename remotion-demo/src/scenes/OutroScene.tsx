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
 * Scene 6 — Outro. CTA card with brand mark, tagline, and the URL.
 */
export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = interpolate(frame, [0, 0.9 * fps], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const enterY = interpolate(enter, [0, 1], [16, 0]);

  // Tagline lags slightly.
  const taglineEnter = interpolate(frame, [0.4 * fps, 1.3 * fps], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
          gap: 28,
          opacity: enter,
          transform: `translateY(${enterY}px)`,
        }}
      >
        <Logo size={160} />

        <h1
          style={{
            margin: 0,
            fontSize: 88,
            fontWeight: 600,
            letterSpacing: "-0.035em",
            color: COLORS.fg,
          }}
        >
          Polymind
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            opacity: taglineEnter,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 36,
              color: COLORS.fgMuted,
              letterSpacing: "-0.02em",
            }}
          >
            One prompt. Every top AI. Pick the best.
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 28,
              color: COLORS.primary,
              letterSpacing: "-0.011em",
              fontWeight: 500,
              marginTop: 8,
            }}
          >
            usepolymind.app — 25 free credits
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
