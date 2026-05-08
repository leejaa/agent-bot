import { getTranslations } from 'next-intl/server';
import Logo from '@/components/brand/Logo';
import { Link } from '@/i18n/navigation';
import { IS_BETA, BETA_FEEDBACK_EMAIL } from '@/lib/beta';

export default async function LandingFooter() {
  const tBrand = await getTranslations('Brand');
  const tFooter = await getTranslations('Footer');

  const linkStyle = {
    fontSize: 'var(--text-body-sm)',
    letterSpacing: 'var(--text-body-sm--letter-spacing)',
  } as const;

  return (
    <footer className="px-4 sm:px-6 py-10 border-t border-[rgba(0,0,0,0.06)]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Logo size={20} />
          <span className="text-deep-graphite" style={linkStyle}>
            {tBrand('name')}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href="/compare"
            className="text-deep-slate hover:text-primary transition-colors"
            style={linkStyle}
          >
            Compare
          </Link>
          <Link
            href="/alternatives"
            className="text-deep-slate hover:text-primary transition-colors"
            style={linkStyle}
          >
            Alternatives
          </Link>
          <Link
            href="/blog"
            className="text-deep-slate hover:text-primary transition-colors"
            style={linkStyle}
          >
            Blog
          </Link>
          {IS_BETA && (
            <a
              href={`mailto:${BETA_FEEDBACK_EMAIL}`}
              className="text-deep-slate hover:text-primary transition-colors"
              style={linkStyle}
            >
              {tFooter('feedback', { email: BETA_FEEDBACK_EMAIL })}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
