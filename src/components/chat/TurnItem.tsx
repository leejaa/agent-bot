'use client';

import { useTranslations } from 'next-intl';
import ModelColumn from './ModelColumn';
import type { Turn } from './useChat';
import type { ModelEntry, ProviderKey } from '@/lib/models';

type Props = {
  turn: Turn;
  models: ModelEntry[];
  /** Optional per-slot picker renderer. When provided, the column header
   *  becomes interactive; when omitted (HeroDemo, etc.) the static name shows. */
  renderPicker?: (slot: ProviderKey, model: ModelEntry) => React.ReactNode;
  /** When true, disables the negative-margin bleed so columns stay within a
   *  constrained container (e.g. the landing-page HeroDemo card). */
  noBleed?: boolean;
};

export default function TurnItem({ turn, models, renderPicker, noBleed }: Props) {
  const t = useTranslations('Chat');

  return (
    <div className="px-4 sm:px-6 pt-6 pb-4">
      <div className="mb-4 flex items-start gap-3">
        <span
          className="shrink-0 px-2 py-0.5 rounded-[var(--radius-pill)] bg-ghost-white text-deep-slate"
          style={{
            fontSize: 'var(--text-caption)',
            letterSpacing: 'var(--text-caption--letter-spacing)',
          }}
        >
          {t('questionLabel')}
        </span>
        <p
          className="text-deep-graphite flex-1 pt-0.5"
          style={{
            fontSize: 'var(--text-body)',
            lineHeight: 'var(--text-body--line-height)',
            letterSpacing: 'var(--text-body--letter-spacing)',
          }}
        >
          {turn.userMessage}
        </p>
      </div>

      <div
        className={[
          'flex md:grid md:grid-cols-3 items-start gap-3',
          'overflow-x-auto md:overflow-visible',
          'snap-x snap-mandatory md:snap-none',
          'pb-2 md:pb-0',
          '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
          noBleed ? '' : '-mx-4 sm:-mx-6 md:mx-0 px-4 sm:px-6 md:px-0',
        ].join(' ')}
      >
        {models.map((m) => (
          <div
            key={m.key}
            className={noBleed ? 'shrink-0 w-[80%] md:w-auto snap-center' : 'snap-center shrink-0 w-[86vw] sm:w-[60vw] md:w-auto'}
          >
            <ModelColumn
              name={m.displayName}
              modelId={m.modelId}
              text={turn[m.key].text}
              streaming={turn[m.key].streaming}
              error={turn[m.key].error}
              picker={renderPicker?.(m.key, m)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
