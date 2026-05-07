import React from "react";
import { COLORS } from "../theme";

/**
 * macOS-style chrome wrapping the chat content. Three traffic-light dots on
 * the left, "polymind.app" pseudo URL bar centered. Used by all chat scenes
 * so the look stays consistent with the in-product HeroDemo.
 */
export const BrowserFrame: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      style={{
        width: 1600,
        borderRadius: 24,
        border: `1px solid ${COLORS.border}`,
        background: COLORS.bgElevated,
        boxShadow: "0 36px 80px -40px rgba(0, 0, 0, 0.22)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 56,
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "0 20px",
          borderBottom: `1px solid ${COLORS.borderFaint}`,
          background: COLORS.bg,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: COLORS.fgFaint }} />
          <div style={{ width: 12, height: 12, borderRadius: 999, background: COLORS.fgFaint }} />
          <div style={{ width: 12, height: 12, borderRadius: 999, background: COLORS.fgFaint }} />
        </div>
        <div
          style={{
            color: COLORS.fgMuted,
            fontSize: 16,
            letterSpacing: "0.02em",
          }}
        >
          polymind.app
        </div>
      </div>

      {children}
    </div>
  );
};
