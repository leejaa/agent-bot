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

/** Frame at which each line's spring animation begins. */
const LINE_OFFSETS = [0, 18, 36];

export const HookScene: React.FC<{ lines: string[] }> = ({ lines }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoEnter = interpolate(frame, [fps * 1.8, fps * 2.4], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: SHORT_COLORS.bg,
        fontFamily: SHORT_FONT,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 0,
        padding: "0 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: "100%",
        }}
      >
        {lines.map((line, i) => (
          <HookLine key={i} text={line} startFrame={LINE_OFFSETS[i] ?? 0} />
        ))}
      </div>

      {/* Polymind wordmark — fades in last */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: logoEnter,
        }}
      >
        <Logo size={44} color={SHORT_COLORS.accent} />
        <span
          style={{
            color: SHORT_COLORS.textMuted,
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          Polymind
        </span>
      </div>
    </AbsoluteFill>
  );
};

const HookLine: React.FC<{ text: string; startFrame: number }> = ({
  text,
  startFrame,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [startFrame, startFrame + 22], [0, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const y = interpolate(progress, [0, 1], [60, 0]);

  return (
    <div style={{ overflow: "hidden" }}>
      <p
        style={{
          margin: 0,
          fontSize: 118,
          fontWeight: 900,
          lineHeight: 1.0,
          letterSpacing: "-0.04em",
          color: SHORT_COLORS.text,
          opacity: progress,
          transform: `translateY(${y}px)`,
        }}
      >
        {text}
      </p>
    </div>
  );
};
