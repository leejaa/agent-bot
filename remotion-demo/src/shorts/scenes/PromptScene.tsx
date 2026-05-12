import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SHORT_COLORS, SHORT_FONT } from "../theme";

export const PromptScene: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = interpolate(frame, [0, fps * 0.5], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const enterY = interpolate(enter, [0, 1], [40, 0]);

  const labelEnter = interpolate(frame, [0, fps * 0.3], [0, 1], {
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
        padding: "0 72px",
        flexDirection: "column",
        gap: 32,
      }}
    >
      {/* "질문" label pill */}
      <div
        style={{
          opacity: labelEnter,
          display: "flex",
          alignSelf: "flex-start",
        }}
      >
        <span
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: SHORT_COLORS.accent,
            background: "rgba(255,138,51,0.12)",
            padding: "8px 24px",
            borderRadius: 999,
            border: `1px solid rgba(255,138,51,0.3)`,
          }}
        >
          Prompt
        </span>
      </div>

      {/* Prompt bubble */}
      <div
        style={{
          opacity: enter,
          transform: `translateY(${enterY}px)`,
          background: SHORT_COLORS.surface,
          border: `1.5px solid rgba(255,255,255,0.1)`,
          borderRadius: 28,
          padding: "52px 56px",
          width: "100%",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            color: SHORT_COLORS.text,
          }}
        >
          {text}
        </p>
      </div>
    </AbsoluteFill>
  );
};
