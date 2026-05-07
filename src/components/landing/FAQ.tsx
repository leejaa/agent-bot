import { getTranslations } from 'next-intl/server';
import { BETA_FEEDBACK_EMAIL } from '@/lib/beta';

const ITEM_KEYS = ['1', '2', '3', '4', '5', '6'] as const;

export default async function FAQ() {
  const t = await getTranslations('FAQ');

  const items = ITEM_KEYS.map((k) => ({
    q: t(`q${k}`),
    a: t(`a${k}`, { email: BETA_FEEDBACK_EMAIL }),
  }));

  return (
    <section id="faq" className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-deep-graphite text-center mb-10"
          style={{
            fontSize: 'var(--text-heading)',
            lineHeight: 'var(--text-heading--line-height)',
            letterSpacing: 'var(--text-heading--letter-spacing)',
          }}
        >
          {t('title')}
        </h2>

        <div className="rounded-[var(--radius-card)] bg-paper-white border border-[rgba(0,0,0,0.06)] divide-y divide-[rgba(0,0,0,0.06)]">
          {items.map(({ q, a }, i) => (
            <details key={i} className="group">
              <summary
                className="flex items-start justify-between gap-4 px-6 py-5 cursor-pointer list-none text-deep-graphite hover:bg-ghost-white transition-colors [&::-webkit-details-marker]:hidden"
                style={{
                  fontSize: 'var(--text-body)',
                  lineHeight: 'var(--text-body--line-height)',
                  letterSpacing: 'var(--text-body--letter-spacing)',
                }}
              >
                <span>{q}</span>
                <span
                  aria-hidden
                  className="shrink-0 mt-0.5 text-deep-slate group-open:rotate-45 transition-transform"
                  style={{
                    fontSize: 22,
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </summary>
              <p
                className="text-deep-slate px-6 pb-5 -mt-1 whitespace-pre-line"
                style={{
                  fontSize: 'var(--text-body-sm)',
                  lineHeight: 'var(--text-body-sm--line-height)',
                  letterSpacing: 'var(--text-body-sm--letter-spacing)',
                }}
              >
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
