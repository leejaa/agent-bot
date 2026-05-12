import { getTranslations } from 'next-intl/server';
import Logo from '@/components/brand/Logo';
import { Link } from '@/i18n/navigation';
import { IS_BETA } from '@/lib/beta';

export default async function LandingNav() {
  const tBrand = await getTranslations('Brand');
  const tLanding = await getTranslations('Landing');
  const tBeta = await getTranslations('Beta');

  return (
    <header className="sticky top-0 z-30 bg-ghost-white/80 backdrop-blur-md border-b border-[rgba(0,0,0,0.04)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={26} />
          <span
            className="text-deep-graphite"
            style={{
              fontSize: 'var(--text-body)',
              letterSpacing: 'var(--text-body--letter-spacing)',
            }}
          >
            {tBrand('name')}
          </span>
          {IS_BETA && (
            <span
              className="px-1.5 py-0.5 rounded-[var(--radius-pill)] bg-primary/10 text-primary"
              style={{
                fontSize: '10px',
                letterSpacing: '0.06em',
                fontWeight: 500,
              }}
            >
              {tBeta('badge')}
            </span>
          )}
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center text-deep-slate hover:text-primary transition-colors"
            style={{
              fontSize: 'var(--text-body-sm)',
              letterSpacing: 'var(--text-body-sm--letter-spacing)',
            }}
          >
            Blog
          </Link>
          <Link
            href="/sign-in"
            className="px-4 h-9 inline-flex items-center rounded-[var(--radius-button)] bg-deep-graphite text-paper-white hover:brightness-110 transition-all"
            style={{
              fontSize: 'var(--text-body-sm)',
              letterSpacing: 'var(--text-body-sm--letter-spacing)',
            }}
          >
            {tLanding('ctaSecondary')}
          </Link>
        </div>
      </div>
    </header>
  );
}
