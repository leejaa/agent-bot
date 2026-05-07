import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { BrowserFrame } from "../components/BrowserFrame";
import { ChatInputView } from "../components/ChatInputView";
import { COLORS } from "../theme";
import { QUESTION } from "../content";

const FONT_FAMILY =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/**
 * Scene 3 — Typewriter. The QUESTION is revealed character-by-character via
 * string-slicing on `useCurrentFrame()`, ending with the input fully filled
 * just before the streaming scene takes over.
 */
export const TypingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Type the entire question over ~80% of the scene, then sit on the full
  // string for the remaining 20% so the cut into the next scene feels natural.
  const typeDuration = Math.floor(durationInFrames * 0.8);
  const progress = Math.min(frame / typeDuration, 1);
  const charsToShow = Math.floor(progress * QUESTION.length);
  const value = QUESTION.slice(0, charsToShow);

  // Blinking caret at ~2 Hz.
  const caretOn = Math.floor(frame / (fps / 2)) % 2 === 0;

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
                color: COLORS.fgFaint,
                fontSize: 22,
                textAlign: "center",
                letterSpacing: "-0.006em",
              }}
            >
              Ask one question — get answers from every top AI, side by side.
            </p>
          </div>
          <ChatInputView value={value} showCaret={caretOn} />
        </div>
      </BrowserFrame>
    </AbsoluteFill>
  );
};
