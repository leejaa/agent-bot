import { getTranslations } from 'next-intl/server';

function TrioIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="6.75" y="10" width="3.5" height="12" rx="1.75" fill="var(--color-primary)" />
      <rect x="14.25" y="5" width="3.5" height="22" rx="1.75" fill="var(--color-primary)" />
      <rect x="21.75" y="8" width="3.5" height="16" rx="1.75" fill="var(--color-primary)" />
    </svg>
  );
}

function CompareIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="5" y="7" width="6" height="18" rx="1.5" stroke="var(--color-primary)" strokeWidth="2" />
      <rect x="13" y="7" width="6" height="18" rx="1.5" stroke="var(--color-primary)" strokeWidth="2" />
      <rect x="21" y="7" width="6" height="18" rx="1.5" stroke="var(--color-primary)" strokeWidth="2" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M9 6h14a2 2 0 0 1 2 2v18l-9-4-9 4V8a2 2 0 0 1 2-2z"
        stroke="var(--color-primary)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 12h8" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default async function Features() {
  const t = await getTranslations('Landing');

  const items = [
    { icon: <TrioIcon />, title: t('feature1Title'), body: t('feature1Body') },
    { icon: <CompareIcon />, title: t('feature2Title'), body: t('feature2Body') },
    { icon: <ArchiveIcon />, title: t('feature3Title'), body: t('feature3Body') },
  ];

  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((it) => (
          <div
            key={it.title}
            className="rounded-[var(--radius-card)] bg-paper-white border border-[rgba(0,0,0,0.06)] p-6 flex flex-col gap-3"
          >
            <div className="w-8 h-8 flex items-center justify-center">{it.icon}</div>
            <h3
              className="text-deep-graphite"
              style={{
                fontSize: 'var(--text-heading-sm)',
                lineHeight: 'var(--text-heading-sm--line-height)',
                letterSpacing: 'var(--text-heading-sm--letter-spacing)',
              }}
            >
              {it.title}
            </h3>
            <p
              className="text-deep-slate"
              style={{
                fontSize: 'var(--text-body-sm)',
                lineHeight: 'var(--text-body-sm--line-height)',
                letterSpacing: 'var(--text-body-sm--letter-spacing)',
              }}
            >
              {it.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
