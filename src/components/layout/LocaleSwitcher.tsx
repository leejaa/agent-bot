'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useTransition } from 'react';

const LABELS: Record<string, string> = {
  en: 'EN',
  ko: 'KO',
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function pick(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next as 'en' | 'ko' });
    });
  }

  return (
    <div
      className="inline-flex items-center gap-0.5 p-0.5 rounded-[var(--radius-pill)] bg-paper-white border border-[rgba(0,0,0,0.08)]"
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => pick(l)}
            disabled={isPending || active}
            className={`px-2.5 h-7 rounded-[var(--radius-pill)] transition-colors ${
              active
                ? 'bg-deep-graphite text-paper-white'
                : 'text-deep-slate hover:text-deep-graphite'
            }`}
            style={{
              fontSize: '12px',
              letterSpacing: '0.02em',
              fontWeight: 500,
            }}
          >
            {LABELS[l] ?? l}
          </button>
        );
      })}
    </div>
  );
}
