'use client';

import { useTranslations } from 'next-intl';

type Props = {
  name: string;
  modelId: string;
  text: string;
  streaming: boolean;
  error?: string;
};

export default function ModelColumn({ name, modelId, text, streaming, error }: Props) {
  const t = useTranslations('Chat');

  return (
    <div className="flex flex-col h-full min-w-0 rounded-[var(--radius-card)] bg-paper-white border border-[rgba(0,0,0,0.06)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[rgba(0,0,0,0.04)] flex items-center gap-2 shrink-0">
        <span
          className="text-deep-graphite"
          style={{
            fontSize: 'var(--text-body-sm)',
            letterSpacing: 'var(--text-body-sm--letter-spacing)',
          }}
        >
          {name}
        </span>
        <span
          className="text-cool-gray"
          style={{
            fontSize: 'var(--text-caption)',
            letterSpacing: 'var(--text-caption--letter-spacing)',
          }}
        >
          {modelId}
        </span>
        {streaming && (
          <span className="ml-auto flex gap-1">
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse [animation-delay:0ms] [animation-duration:1.2s]" />
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse [animation-delay:200ms] [animation-duration:1.2s]" />
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse [animation-delay:400ms] [animation-duration:1.2s]" />
          </span>
        )}
      </div>

      <div
        className="flex-1 overflow-y-auto px-5 py-4 text-deep-graphite whitespace-pre-wrap"
        style={{
          fontSize: 'var(--text-body-sm)',
          lineHeight: 'var(--text-body-sm--line-height)',
          letterSpacing: 'var(--text-body-sm--letter-spacing)',
        }}
      >
        {error ? (
          <span className="text-alert-red">{error}</span>
        ) : text ? (
          text
        ) : streaming ? null : (
          <span className="text-cool-gray italic">{t('waiting')}</span>
        )}
      </div>
    </div>
  );
}
