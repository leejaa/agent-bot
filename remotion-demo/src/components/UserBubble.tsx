import React from "react";
import { COLORS } from "../theme";

/**
 * The user's question line shown above the 3 model columns. Mirrors the
 * `questionLabel + userMessage` row inside `TurnItem.tsx`.
 */
export const UserBubble: React.FC<{ text: string; opacity?: number }> = ({
  text,
  opacity = 1,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        padding: "0 32px",
        marginBottom: 24,
        opacity,
      }}
    >
      <span
        style={{
          padding: "4px 12px",
          borderRadius: 999,
          background: COLORS.bg,
          color: COLORS.fgMuted,
          fontSize: 14,
          letterSpacing: "0.01em",
          flexShrink: 0,
          marginTop: 4,
        }}
      >
        Question
      </span>
      <p
        style={{
          margin: 0,
          color: COLORS.fg,
          fontSize: 22,
          lineHeight: 1.4,
          letterSpacing: "-0.006em",
        }}
      >
        {text}
      </p>
    </div>
  );
};
