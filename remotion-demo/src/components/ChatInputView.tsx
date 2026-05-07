import React from "react";
import { COLORS } from "../theme";

/**
 * Read-only visual replica of Polymind's chat input. Mirrors the styling of
 * `agent-bot/src/components/chat/ChatInputView.tsx` so the demo and the real
 * product feel identical.
 */
export const ChatInputView: React.FC<{
  value: string;
  isStreaming?: boolean;
  showCaret?: boolean;
}> = ({ value, isStreaming = false, showCaret = false }) => {
  const placeholder = "Ask anything…";
  const display = value.length > 0 ? value : placeholder;
  const isPlaceholder = value.length === 0;

  return (
    <div
      style={{
        padding: "16px 32px 24px",
      }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          borderRadius: 16,
          border: `1.5px solid ${COLORS.border}`,
          background: COLORS.bgElevated,
        }}
      >
        <div
          style={{
            padding: "20px 80px 20px 24px",
            color: isPlaceholder ? COLORS.fgFaint : COLORS.fg,
            fontSize: 22,
            lineHeight: 1.4,
            letterSpacing: "-0.006em",
            minHeight: 28,
          }}
        >
          {display}
          {showCaret && !isPlaceholder && (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 24,
                background: COLORS.fg,
                marginLeft: 2,
                verticalAlign: "middle",
              }}
            />
          )}
        </div>

        <button
          type="button"
          aria-hidden
          style={{
            position: "absolute",
            right: 12,
            bottom: 12,
            width: 48,
            height: 48,
            borderRadius: 12,
            border: "none",
            background: isStreaming ? COLORS.fgFaint : COLORS.primary,
            color: COLORS.bgElevated,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "default",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12l14-7-7 14-2-6-5-1z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
