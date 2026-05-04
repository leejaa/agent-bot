type Props = {
  size?: number;
  className?: string;
};

/**
 * Trio Pulse — three vertical capsule bars at varied heights, evoking three
 * AI voices responding in parallel. No enclosing shape; the rhythm itself is
 * the mark.
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
      aria-label="Agent Bot"
    >
      <rect x="6.75" y="10" width="3.5" height="12" rx="1.75" fill="var(--color-action-indigo)" />
      <rect x="14.25" y="5" width="3.5" height="22" rx="1.75" fill="var(--color-action-indigo)" />
      <rect x="21.75" y="8" width="3.5" height="16" rx="1.75" fill="var(--color-action-indigo)" />
    </svg>
  );
}
