import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function Pricing() {
  const t = await getTranslations('Landing');

  return (
    <section id="pricing" className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-deep-graphite text-center mb-8 sm:mb-10"
          style={{
            fontSize: 'var(--text-heading)',
            lineHeight: 'var(--text-heading--line-height)',
            letterSpacing: 'var(--text-heading--letter-spacing)',
          }}
        >
          {t('pricingTitle')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-[var(--radius-card)] bg-paper-white border border-[rgba(0,0,0,0.06)] p-6 flex flex-col gap-4">
            <div>
              <p
                className="text-deep-slate"
                style={{
                  fontSize: 'var(--text-caption)',
                  letterSpacing: '0.04em',
                }}
              >
                {t('pricingFree').toUpperCase()}
              </p>
              <p
                className="text-deep-graphite mt-1"
                style={{
                  fontSize: 'var(--text-heading-sm)',
                  lineHeight: 'var(--text-heading-sm--line-height)',
                  letterSpacing: 'var(--text-heading-sm--letter-spacing)',
                }}
              >
                $0
              </p>
              <p
                className="text-deep-slate mt-2"
                style={{
                  fontSize: 'var(--text-body-sm)',
                  lineHeight: 'var(--text-body-sm--line-height)',
                  letterSpacing: 'var(--text-body-sm--letter-spacing)',
                }}
              >
                {t('pricingFreeDesc')}
              </p>
            </div>
            <Link
              href="/sign-in"
              className="mt-auto inline-flex items-center justify-center h-10 rounded-[var(--radius-button)] bg-deep-graphite text-paper-white hover:brightness-110 transition-all"
              style={{
                fontSize: 'var(--text-body-sm)',
                letterSpacing: 'var(--text-body-sm--letter-spacing)',
              }}
            >
              {t('ctaPrimary')}
            </Link>
          </div>

          <div className="rounded-[var(--radius-card)] bg-paper-white border-2 border-primary p-6 flex flex-col gap-4 relative">
            <span
              className="absolute -top-2.5 left-6 px-2 py-0.5 rounded-[var(--radius-pill)] bg-primary text-paper-white"
              style={{
                fontSize: '11px',
                letterSpacing: '0.04em',
              }}
            >
              PRO
            </span>
            <div>
              <p
                className="text-primary"
                style={{
                  fontSize: 'var(--text-caption)',
                  letterSpacing: '0.04em',
                }}
              >
                {t('pricingPro').toUpperCase()}
              </p>
              <p
                className="text-deep-graphite mt-1"
                style={{
                  fontSize: 'var(--text-heading-sm)',
                  lineHeight: 'var(--text-heading-sm--line-height)',
                  letterSpacing: 'var(--text-heading-sm--letter-spacing)',
                }}
              >
                {t('pricingProPrice')}
              </p>
              <p
                className="text-deep-slate mt-2"
                style={{
                  fontSize: 'var(--text-body-sm)',
                  lineHeight: 'var(--text-body-sm--line-height)',
                  letterSpacing: 'var(--text-body-sm--letter-spacing)',
                }}
              >
                {t('pricingProDesc')}
              </p>
            </div>
            <button
              type="button"
              disabled
              className="mt-auto inline-flex items-center justify-center h-10 rounded-[var(--radius-button)] bg-cool-gray text-paper-white opacity-70 cursor-not-allowed"
              style={{
                fontSize: 'var(--text-body-sm)',
                letterSpacing: 'var(--text-body-sm--letter-spacing)',
              }}
            >
              Coming soon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
