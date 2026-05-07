import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BrowserFrame } from "../components/BrowserFrame";
import { ChatInputView } from "../components/ChatInputView";
import { ModelColumn } from "../components/ModelColumn";
import { UserBubble } from "../components/UserBubble";
import { COLORS } from "../theme";
import { ANSWERS, MODEL_LABELS, QUESTION } from "../content";

const FONT_FAMILY =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// Each model finishes at a slightly different point so the cluster feels
// alive (Gemini fastest, Claude slowest). Values are *fractions of the scene
// duration* so that retiming the scene as a whole stays consistent.
const FILL_FRACTION = {
  openai: 0.85,
  anthropic: 0.95,
  google: 0.7,
} as const;

/**
 * Scene 4 — The main event. User bubble + 3 columns streaming in parallel.
 */
export const StreamingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // User bubble + columns enter together over the first ~0.4s.
  const enter = interpolate(frame, [0, 12], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse phase cycles every 0.9s.
  const pulsePhase = (frame / (fps * 0.9)) % 1;

  const sliceFor = (provider: keyof typeof ANSWERS) => {
    const full = ANSWERS[provider];
    const fillFrames = durationInFrames * FILL_FRACTION[provider];
    const progress = Math.min(frame / fillFrames, 1);
    const chars = Math.floor(progress * full.length);
    return {
      text: full.slice(0, chars),
      streaming: progress < 1,
    };
  };

  const openai = sliceFor("openai");
  const anthropic = sliceFor("anthropic");
  const google = sliceFor("google");

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
      }}
    >
      <div style={{ opacity: enter }}>
        <BrowserFrame>
          <div
            style={{
              minHeight: 720,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "32px 0 16px" }}>
              <UserBubble text={QUESTION} />

              <div
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  padding: "0 32px",
                }}
              >
                <ModelColumn
                  name={MODEL_LABELS.openai.name}
                  modelId={MODEL_LABELS.openai.id}
                  text={openai.text}
                  streaming={openai.streaming}
                  pulsePhase={pulsePhase}
                />
                <ModelColumn
                  name={MODEL_LABELS.anthropic.name}
                  modelId={MODEL_LABELS.anthropic.id}
                  text={anthropic.text}
                  streaming={anthropic.streaming}
                  pulsePhase={pulsePhase}
                />
                <ModelColumn
                  name={MODEL_LABELS.google.name}
                  modelId={MODEL_LABELS.google.id}
                  text={google.text}
                  streaming={google.streaming}
                  pulsePhase={pulsePhase}
                />
              </div>
            </div>
            <div style={{ flex: 1 }} />
            <ChatInputView value="" isStreaming />
          </div>
        </BrowserFrame>
      </div>
    </AbsoluteFill>
  );
};
