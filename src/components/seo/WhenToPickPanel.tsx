type Props = {
  headline: string;
  bullets: string[];
};

export default function WhenToPickPanel({ headline, bullets }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <h3
        className="text-deep-graphite"
        style={{
          fontSize: 'var(--text-heading-sm)',
          lineHeight: 'var(--text-heading-sm--line-height)',
          letterSpacing: 'var(--text-heading-sm--letter-spacing)',
        }}
      >
        {headline}
      </h3>
      <ul className="list-disc pl-5 space-y-2">
        {bullets.map((b) => (
          <li
            key={b}
            className="text-deep-slate"
            style={{
              fontSize: 'var(--text-body-sm)',
              lineHeight: 'var(--text-body-sm--line-height)',
              letterSpacing: 'var(--text-body-sm--letter-spacing)',
            }}
          >
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
