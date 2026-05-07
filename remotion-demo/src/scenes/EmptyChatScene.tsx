import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { BrowserFrame } from "../components/BrowserFrame";
import { ChatInputView } from "../components/ChatInputView";
import { COLORS } from "../theme";

const FONT_FAMILY =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/**
 * Scene 2 — Empty chat. The browser frame slides up, idle hint visible,
 * input ready. Bridges the brand intro into the live demo.
 */
export const EmptyChatScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Browser frame entrance.
  const enter = interpolate(frame, [0, 18], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const frameY = interpolate(enter, [0, 1], [40, 0]);

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          opacity: enter,
          transform: `translateY(${frameY}px)`,
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
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 32px",
              }}
            >
              <p
                style={{
                  color: COLORS.fgMuted,
                  fontSize: 22,
                  textAlign: "center",
                  letterSpacing: "-0.006em",
                }}
              >
                Ask one question — get answers from every top AI, side by side.
              </p>
            </div>
            <ChatInputView value="" />
          </div>
        </BrowserFrame>
      </div>
    </AbsoluteFill>
  );
};
