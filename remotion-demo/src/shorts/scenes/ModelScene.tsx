import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SHORT_COLORS, SHORT_FONT, MODEL_META, type ModelProvider } from "../theme";

/** Text fills up to this fraction of the scene duration, then holds. */
const STREAM_FILL = 0.82;

export const ModelScene: React.FC<{
  provider: ModelProvider;
  text: string;
}> = ({ provider, text }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const meta = MODEL_META[provider];

  // Header + text area slide in together
  const enter = interpolate(frame, [0, fps * 0.35], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const enterY = interpolate(enter, [0, 1], [24, 0]);

  // Progress bar filling across the whole scene
  const progress = frame / durationInFrames;

  // Streaming: text reveals up to STREAM_FILL × durationInFrames
  const streamFrames = durationInFrames * STREAM_FILL;
  const streamProgress = Math.min(frame / streamFrames, 1);
  const visibleChars = Math.floor(streamProgress * text.length);
  const visibleText = text.slice(0, visibleChars);
  const isStreaming = streamProgress < 1;

  // Blinking cursor (3 Hz)
  const cursorVisible = isStreaming && Math.floor(frame / 10) % 2 === 0;

  return (
    <AbsoluteFill
      style={{
        background: SHORT_COLORS.bg,
        fontFamily: SHORT_FONT,
        flexDirection: "column",
      }}
    >
      {/* Top progress bar */}
      <div
        style={{
          height: 4,
          background: "rgba(255,255,255,0.1)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            background: meta.color,
            borderRadius: "0 2px 2px 0",
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "72px 72px 100px",
          opacity: enter,
          transform: `translateY(${enterY}px)`,
        }}
      >
        {/* Model badge */}
        <div style={{ marginBottom: 56 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              background: `${meta.color}18`,
              border: `1.5px solid ${meta.color}44`,
              borderRadius: 999,
              padding: "14px 28px",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: meta.color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: meta.color,
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              {meta.name}
            </span>
            <span
              style={{
                color: SHORT_COLORS.textMuted,
                fontSize: 26,
                fontWeight: 400,
              }}
            >
              · {meta.label}
            </span>
          </div>
        </div>

        {/* Streaming response text */}
        <div style={{ flex: 1, position: "relative" }}>
          <p
            style={{
              margin: 0,
              fontSize: 52,
              fontWeight: 500,
              lineHeight: 1.5,
              letterSpacing: "-0.015em",
              color: SHORT_COLORS.text,
              whiteSpace: "pre-wrap",
            }}
          >
            {visibleText}
            {cursorVisible && (
              <span
                style={{
                  display: "inline-block",
                  width: 3,
                  height: "1em",
                  background: meta.color,
                  marginLeft: 3,
                  verticalAlign: "text-bottom",
                  borderRadius: 2,
                }}
              />
            )}
          </p>
        </div>

        {/* Streaming indicator dots at bottom */}
        {isStreaming && (
          <StreamingDots color={meta.color} frame={frame} fps={fps} />
        )}
      </div>
    </AbsoluteFill>
  );
};

const StreamingDots: React.FC<{
  color: string;
  frame: number;
  fps: number;
}> = ({ color, frame, fps }) => {
  const phase = (frame / (fps * 0.8)) % 1;

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
        marginTop: 32,
      }}
    >
      {[0, 1, 2].map((i) => {
        const localPhase = (phase + i * 0.33) % 1;
        const tri = 1 - Math.abs(localPhase * 2 - 1);
        const opacity = 0.25 + tri * 0.75;
        return (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: color,
              opacity,
            }}
          />
        );
      })}
      <span
        style={{
          color: SHORT_COLORS.textFaint,
          fontSize: 26,
          marginLeft: 6,
          fontWeight: 400,
        }}
      >
        Generating...
      </span>
    </div>
  );
};
