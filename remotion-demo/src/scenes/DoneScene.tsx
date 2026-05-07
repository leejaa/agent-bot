import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { BrowserFrame } from "../components/BrowserFrame";
import { ChatInputView } from "../components/ChatInputView";
import { ModelColumn } from "../components/ModelColumn";
import { UserBubble } from "../components/UserBubble";
import { ANSWERS, MODEL_LABELS, QUESTION } from "../content";
import { COLORS } from "../theme";

const FONT_FAMILY =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/**
 * Scene 5 — Done. All three answers are complete; the dot indicators are
 * gone. We hold for ~2.5 seconds so the viewer can take in the comparison,
 * then ease into the outro.
 */
export const DoneScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle highlight ring on the middle column to suggest "user picks one".
  const highlight = interpolate(frame, [12, 36], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
      }}
    >
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
                position: "relative",
              }}
            >
              <ModelColumn
                name={MODEL_LABELS.openai.name}
                modelId={MODEL_LABELS.openai.id}
                text={ANSWERS.openai}
                streaming={false}
                pulsePhase={0}
              />
              <div style={{ flex: 1, position: "relative" }}>
                <ModelColumn
                  name={MODEL_LABELS.anthropic.name}
                  modelId={MODEL_LABELS.anthropic.id}
                  text={ANSWERS.anthropic}
                  streaming={false}
                  pulsePhase={0}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: -3,
                    borderRadius: 19,
                    border: `2px solid ${COLORS.primary}`,
                    pointerEvents: "none",
                    opacity: highlight * 0.85,
                    boxShadow: `0 0 0 6px rgba(255, 138, 51, ${highlight * 0.12})`,
                  }}
                />
              </div>
              <ModelColumn
                name={MODEL_LABELS.google.name}
                modelId={MODEL_LABELS.google.id}
                text={ANSWERS.google}
                streaming={false}
                pulsePhase={0}
              />
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <ChatInputView value="" />
        </div>
      </BrowserFrame>
    </AbsoluteFill>
  );
};
