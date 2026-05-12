import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SHORT_COLORS, SHORT_FONT, MODEL_META } from "../theme";
import type { ShotVerdict } from "../../shots/types";

const ROWS: Array<{ provider: keyof typeof MODEL_META; verdictKey: keyof ShotVerdict }> = [
  { provider: "gpt", verdictKey: "gpt" },
  { provider: "claude", verdictKey: "claude" },
  { provider: "gemini", verdictKey: "gemini" },
];

/** Frame offset at which each verdict row starts animating in. */
const ROW_OFFSETS = [0, 20, 40];

export const VerdictScene: React.FC<{ verdict: ShotVerdict }> = ({
  verdict,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
        padding: "100px 72px",
        flexDirection: "column",
        justifyContent: "center",
        gap: 48,
      }}
    >
      {/* Section label */}
      <div style={{ opacity: labelEnter }}>
        <p
          style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: SHORT_COLORS.accent,
          }}
        >
          Key Differences
        </p>
      </div>

      {/* Verdict rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {ROWS.map(({ provider, verdictKey }, i) => (
          <VerdictRow
            key={provider}
            provider={provider}
            text={verdict[verdictKey]}
            startFrame={ROW_OFFSETS[i] ?? 0}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const VerdictRow: React.FC<{
  provider: keyof typeof MODEL_META;
  text: string;
  startFrame: number;
}> = ({ provider, text, startFrame }) => {
  const frame = useCurrentFrame();
  const meta = MODEL_META[provider];

  const enter = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const enterX = interpolate(enter, [0, 1], [-30, 0]);

  return (
    <div
      style={{
        opacity: enter,
        transform: `translateX(${enterX}px)`,
        display: "flex",
        alignItems: "center",
        gap: 28,
        background: SHORT_COLORS.surface,
        border: `1.5px solid rgba(255,255,255,0.07)`,
        borderRadius: 20,
        padding: "36px 40px",
      }}
    >
      {/* Color dot */}
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 999,
          background: meta.color,
          flexShrink: 0,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: meta.color,
            letterSpacing: "-0.005em",
          }}
        >
          {meta.name}
        </span>
        <span
          style={{
            fontSize: 42,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: SHORT_COLORS.text,
            lineHeight: 1.2,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};
