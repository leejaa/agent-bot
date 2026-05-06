import { getTranslations } from 'next-intl/server';
import { BETA_FEEDBACK_EMAIL } from '@/lib/beta';

export default async function BetaNotice() {
  const t = await getTranslations('Beta');

  return (
    <section id="beta" className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-4">
        <span
          className="px-2.5 py-1 rounded-[var(--radius-pill)] bg-primary/10 text-primary"
          style={{
            fontSize: '11px',
            letterSpacing: '0.06em',
            fontWeight: 500,
          }}
        >
          {t('badge')}
        </span>

        <h2
          className="text-deep-graphite"
          style={{
            fontSize: 'var(--text-heading)',
            lineHeight: 'var(--text-heading--line-height)',
            letterSpacing: 'var(--text-heading--letter-spacing)',
          }}
        >
          {t('noticeTitle')}
        </h2>

        <p
          className="text-deep-slate max-w-xl"
          style={{
            fontSize: 'var(--text-body)',
            lineHeight: 'var(--text-body--line-height)',
            letterSpacing: 'var(--text-body--letter-spacing)',
          }}
        >
          {t('noticeBody')}
        </p>

        <a
          href={`mailto:${BETA_FEEDBACK_EMAIL}`}
          className="mt-2 inline-flex items-center justify-center px-5 h-11 rounded-[var(--radius-button)] border border-[rgba(0,0,0,0.12)] text-deep-graphite hover:bg-paper-white transition-all"
          style={{
            fontSize: 'var(--text-body)',
            letterSpacing: 'var(--text-body--letter-spacing)',
          }}
        >
          {t('noticeCta')}
        </a>
      </div>
    </section>
  );
}
