import React from "react";
import { COLORS } from "../theme";

/**
 * One column inside the streaming response area. Mirrors
 * `agent-bot/src/components/chat/ModelColumn.tsx`.
 *
 * `streaming` toggles the pulsing dots indicator in the header.
 * `text` is the partial text already streamed in (typewriter style).
 */
export const ModelColumn: React.FC<{
  name: string;
  modelId: string;
  text: string;
  streaming: boolean;
  pulsePhase: number; // 0..1, drives the 3-dot pulse
}> = ({ name, modelId, text, streaming, pulsePhase }) => {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        borderRadius: 16,
        border: `1px solid ${COLORS.borderFaint}`,
        background: COLORS.bgElevated,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          borderBottom: `1px solid ${COLORS.borderFaint}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            color: COLORS.fg,
            fontSize: 18,
            letterSpacing: "-0.006em",
          }}
        >
          {name}
        </span>
        <span
          style={{
            color: COLORS.fgFaint,
            fontSize: 13,
            letterSpacing: "0.01em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flex: 1,
          }}
        >
          {modelId}
        </span>
        {streaming && (
          <div style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  background: COLORS.primary,
                  opacity: pulseOpacity(pulsePhase, i),
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          padding: "20px 24px 24px",
          color: COLORS.fg,
          fontSize: 17,
          lineHeight: 1.55,
          whiteSpace: "pre-wrap",
          letterSpacing: "-0.006em",
          minHeight: 320,
        }}
      >
        {text}
      </div>
    </div>
  );
};

function pulseOpacity(phase: number, index: number): number {
  // Stagger: each dot is offset by 1/3 of the cycle.
  const localPhase = (phase + index * 0.33) % 1;
  // Triangle wave from 0.3 → 1 → 0.3 over the cycle for a subtle breathe.
  const tri = 1 - Math.abs(localPhase * 2 - 1);
  return 0.3 + tri * 0.7;
}
