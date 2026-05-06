type Props = {
  size?: number;
  className?: string;
};

/**
 * Polymind Synapse — a small neural constellation.
 *
 * One central hub (the user's question / the synthesis) connected to five
 * outer nodes (multiple minds answering in parallel) by thin lines. The
 * asymmetric placement reads as a living network rather than a regular
 * polygon, capturing the "poly + mind" identity: many distinct intelligences
 * in conversation.
 */
export default function Logo({ size = 32, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Polymind"
    >
      <g
        stroke="var(--color-primary)"
        strokeWidth="1.1"
        strokeLinecap="round"
      >
        <line x1="16" y1="16" x2="16" y2="5" />
        <line x1="16" y1="16" x2="27" y2="10" />
        <line x1="16" y1="16" x2="24.5" y2="25.5" />
        <line x1="16" y1="16" x2="8" y2="26" />
        <line x1="16" y1="16" x2="5" y2="13" />
      </g>
      <circle cx="16" cy="16" r="3" fill="var(--color-primary)" />
      <circle cx="16" cy="5" r="1.9" fill="var(--color-primary)" />
      <circle cx="27" cy="10" r="1.9" fill="var(--color-primary)" />
      <circle cx="24.5" cy="25.5" r="1.9" fill="var(--color-primary)" />
      <circle cx="8" cy="26" r="1.9" fill="var(--color-primary)" />
      <circle cx="5" cy="13" r="1.9" fill="var(--color-primary)" />
    </svg>
  );
}
