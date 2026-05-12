import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Logo } from "../../components/Logo";
import { SHORT_COLORS, SHORT_FONT } from "../theme";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoEnter = interpolate(frame, [0, fps * 0.5], [0, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(frame, [0, fps * 0.5], [0.7, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textEnter = interpolate(frame, [fps * 0.3, fps * 0.9], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(textEnter, [0, 1], [20, 0]);

  const urlEnter = interpolate(frame, [fps * 0.6, fps * 1.2], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(60% 45% at 50% 40%, rgba(255,138,51,0.14) 0%, ${SHORT_COLORS.bg} 70%)`,
        fontFamily: SHORT_FONT,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 40,
      }}
    >
      {/* Logo */}
      <div
        style={{
          opacity: logoEnter,
          transform: `scale(${logoScale})`,
        }}
      >
        <Logo size={120} color={SHORT_COLORS.accent} />
      </div>

      {/* Wordmark + tagline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          opacity: textEnter,
          transform: `translateY(${textY}px)`,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: "-0.035em",
            color: SHORT_COLORS.text,
          }}
        >
          Polymind
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 36,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            color: SHORT_COLORS.textMuted,
            textAlign: "center",
          }}
        >
          Compare them yourself
        </p>
      </div>

      {/* URL pill */}
      <div
        style={{
          opacity: urlEnter,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            background: "rgba(255,138,51,0.12)",
            border: `1.5px solid rgba(255,138,51,0.35)`,
            borderRadius: 999,
            padding: "20px 48px",
          }}
        >
          <span
            style={{
              color: SHORT_COLORS.accent,
              fontSize: 40,
              fontWeight: 600,
              letterSpacing: "-0.015em",
            }}
          >
            usepolymind.app
          </span>
        </div>
        <span
          style={{
            color: SHORT_COLORS.textFaint,
            fontSize: 26,
            fontWeight: 400,
          }}
        >
          Free during beta
        </span>
      </div>
    </AbsoluteFill>
  );
};
