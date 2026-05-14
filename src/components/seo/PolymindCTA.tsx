import { Link } from '@/i18n/navigation';

type Variant = 'card' | 'inline';

type Props = {
  /** Override headline. */
  headline?: string;
  /** Override body copy. */
  body?: string;
  variant?: Variant;
};

const DEFAULT_HEADLINE = 'See the difference yourself in five minutes';
const DEFAULT_BODY =
  'Polymind sends one prompt to GPT, Claude, and Gemini at the same time and shows their answers side by side. Start free — 25 credits included, no card required.';

export default function PolymindCTA({
  headline = DEFAULT_HEADLINE,
  body = DEFAULT_BODY,
  variant = 'card',
}: Props) {
  if (variant === 'inline') {
    return (
      <p
        className="text-deep-graphite my-4"
        style={{
          fontSize: 'var(--text-body)',
          lineHeight: 'var(--text-body--line-height)',
        }}
      >
        {body}{' '}
        <Link
          href="/sign-in"
          className="text-primary underline underline-offset-2 hover:opacity-80"
        >
          Try Polymind free →
        </Link>
      </p>
    );
  }

  return (
    <div className="rounded-[var(--radius-card)] bg-paper-white border border-[rgba(0,0,0,0.06)] p-6 my-10">
      <h2
        className="text-deep-graphite mb-2"
        style={{
          fontSize: 'var(--text-heading-sm)',
          lineHeight: 'var(--text-heading-sm--line-height)',
          letterSpacing: 'var(--text-heading-sm--letter-spacing)',
        }}
      >
        {headline}
      </h2>
      <p
        className="text-deep-slate mb-4"
        style={{
          fontSize: 'var(--text-body-sm)',
          lineHeight: 'var(--text-body-sm--line-height)',
          letterSpacing: 'var(--text-body-sm--letter-spacing)',
        }}
      >
        {body}
      </p>
      <Link
        href="/sign-in"
        className="inline-flex items-center justify-center px-5 h-11 rounded-[var(--radius-button)] bg-primary text-paper-white hover:brightness-110 transition-all"
        style={{
          fontSize: 'var(--text-body)',
          letterSpacing: 'var(--text-body--letter-spacing)',
        }}
      >
        Get started
      </Link>
    </div>
  );
}
