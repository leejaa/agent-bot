import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function Hero() {
  const t = await getTranslations('Landing');

  return (
    <section className="relative px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 40% at 50% 0%, rgba(255, 138, 51, 0.10) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <h1
          className="text-deep-graphite"
          style={{
            fontSize: 'clamp(34px, 6vw, var(--text-heading-lg))',
            lineHeight: 'var(--text-heading-lg--line-height)',
            letterSpacing: 'var(--text-heading-lg--letter-spacing)',
          }}
        >
          {t('hero')}
        </h1>
        <p
          className="text-deep-slate max-w-xl"
          style={{
            fontSize: 'var(--text-subheading)',
            lineHeight: 'var(--text-subheading--line-height)',
            letterSpacing: 'var(--text-subheading--letter-spacing)',
          }}
        >
          {t('heroSub')}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center px-5 h-11 rounded-[var(--radius-button)] bg-primary text-paper-white hover:brightness-110 transition-all"
            style={{
              fontSize: 'var(--text-body)',
              letterSpacing: 'var(--text-body--letter-spacing)',
            }}
          >
            {t('ctaPrimary')}
          </Link>
        </div>
      </div>
    </section>
  );
}
