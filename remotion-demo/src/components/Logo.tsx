import React from "react";
import { COLORS } from "../theme";

/**
 * Polymind synapse logo: 1 hub + 5 outer nodes connected by thin lines.
 * Mirrors `agent-bot/src/components/brand/Logo.tsx` and `src/app/icon.svg`.
 */
export const Logo: React.FC<{ size?: number; color?: string }> = ({
  size = 200,
  color = COLORS.primary,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke={color} strokeWidth="1.1" strokeLinecap="round">
        <line x1="16" y1="16" x2="16" y2="5" />
        <line x1="16" y1="16" x2="27" y2="10" />
        <line x1="16" y1="16" x2="24.5" y2="25.5" />
        <line x1="16" y1="16" x2="8" y2="26" />
        <line x1="16" y1="16" x2="5" y2="13" />
      </g>
      <circle cx="16" cy="16" r="3" fill={color} />
      <circle cx="16" cy="5" r="1.9" fill={color} />
      <circle cx="27" cy="10" r="1.9" fill={color} />
      <circle cx="24.5" cy="25.5" r="1.9" fill={color} />
      <circle cx="8" cy="26" r="1.9" fill={color} />
      <circle cx="5" cy="13" r="1.9" fill={color} />
    </svg>
  );
};
