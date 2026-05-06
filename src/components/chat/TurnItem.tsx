'use client';

import { useTranslations } from 'next-intl';
import ModelColumn from './ModelColumn';
import type { Turn } from './useChat';
import type { ModelEntry } from '@/lib/models';

type Props = {
  turn: Turn;
  models: ModelEntry[];
};

export default function TurnItem({ turn, models }: Props) {
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
        className="
          flex md:grid md:grid-cols-3
          overflow-x-auto md:overflow-visible
          snap-x snap-mandatory md:snap-none
          gap-3
          -mx-4 sm:-mx-6 md:mx-0
          px-4 sm:px-6 md:px-0
          pb-2 md:pb-0
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        "
      >
        {models.map((m) => (
          <div
            key={m.key}
            className="snap-center shrink-0 w-[86vw] sm:w-[60vw] md:w-auto md:shrink flex"
          >
            <div className="flex-1 flex">
              <ModelColumn
                name={m.displayName}
                modelId={m.modelId}
                text={turn[m.key].text}
                streaming={turn[m.key].streaming}
                error={turn[m.key].error}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
