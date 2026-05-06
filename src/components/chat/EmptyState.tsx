'use client';

import { useTranslations } from 'next-intl';
import Logo from '@/components/brand/Logo';
import type { ModelEntry } from '@/lib/models';

type Props = {
  onPick: (text: string) => void;
  models: ModelEntry[];
};

export default function EmptyState({ onPick, models }: Props) {
  const t = useTranslations('Chat');
  const suggestions = [t('suggestion1'), t('suggestion2'), t('suggestion3')];
  const modelLabel = models.map((m) => m.displayName).join(' · ');

  return (
    <div className="h-full flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 max-w-2xl w-full">
        <Logo size={56} />

        <div className="text-center space-y-2">
          <h2
            className="text-deep-graphite"
            style={{
              fontSize: 'var(--text-subheading)',
              lineHeight: 'var(--text-subheading--line-height)',
              letterSpacing: 'var(--text-subheading--letter-spacing)',
            }}
          >
            {t('emptyTitle')}
          </h2>
          <p
            className="text-deep-slate"
            style={{
              fontSize: 'var(--text-body-sm)',
              lineHeight: 'var(--text-body-sm--line-height)',
              letterSpacing: 'var(--text-body-sm--letter-spacing)',
            }}
          >
            {t('emptySubtitle', { models: modelLabel })}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full pt-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onPick(s)}
              className="text-left px-4 py-3 rounded-[var(--radius-card)] bg-paper-white border border-[rgba(0,0,0,0.06)] hover:border-primary/40 hover:bg-ghost-white transition-colors text-deep-graphite"
              style={{
                fontSize: 'var(--text-body-sm)',
                lineHeight: 'var(--text-body-sm--line-height)',
                letterSpacing: 'var(--text-body-sm--letter-spacing)',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
