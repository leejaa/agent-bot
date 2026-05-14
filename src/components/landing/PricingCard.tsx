import { Link } from '@/i18n/navigation';

type Props = {
  label: string;
  price: string;
  unit: string;
  desc: string;
  ctaLabel: string;
  highlighted?: boolean;
  badge?: string;
};

export default function PricingCard({ label, price, unit, desc, ctaLabel, highlighted, badge }: Props) {
  const borderClass = highlighted
    ? 'border-2 border-primary'
    : 'border border-[rgba(0,0,0,0.06)]';

  const btnClass = highlighted
    ? 'bg-primary text-paper-white hover:brightness-110'
    : 'bg-deep-graphite text-paper-white hover:brightness-110';

  const labelColor = highlighted ? 'text-primary' : 'text-deep-slate';

  return (
    <div className={`rounded-[var(--radius-card)] bg-paper-white ${borderClass} p-6 flex flex-col gap-4 relative`}>
      {badge && (
        <span
          className="absolute -top-2.5 left-6 px-2 py-0.5 rounded-[var(--radius-pill)] bg-primary text-paper-white"
          style={{ fontSize: '11px', letterSpacing: '0.04em' }}
        >
          {badge}
        </span>
      )}
      <div>
        <p
          className={labelColor}
          style={{ fontSize: 'var(--text-caption)', letterSpacing: '0.04em' }}
        >
          {label.toUpperCase()}
        </p>
        <div className="flex items-baseline gap-2 mt-1">
          <p
            className="text-deep-graphite"
            style={{
              fontSize: 'var(--text-heading-sm)',
              lineHeight: 'var(--text-heading-sm--line-height)',
              letterSpacing: 'var(--text-heading-sm--letter-spacing)',
            }}
          >
            {price}
          </p>
          {unit && (
            <p
              className="text-deep-slate"
              style={{
                fontSize: 'var(--text-body-sm)',
                letterSpacing: 'var(--text-body-sm--letter-spacing)',
              }}
            >
              {unit}
            </p>
          )}
        </div>
        <p
          className="text-deep-slate mt-2"
          style={{
            fontSize: 'var(--text-body-sm)',
            lineHeight: 'var(--text-body-sm--line-height)',
            letterSpacing: 'var(--text-body-sm--letter-spacing)',
          }}
        >
          {desc}
        </p>
      </div>
      <Link
        href="/sign-in"
        className={`mt-auto inline-flex items-center justify-center h-10 rounded-[var(--radius-button)] transition-all ${btnClass}`}
        style={{
          fontSize: 'var(--text-body-sm)',
          letterSpacing: 'var(--text-body-sm--letter-spacing)',
        }}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
