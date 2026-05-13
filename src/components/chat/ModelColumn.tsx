'use client';

import { useTranslations } from 'next-intl';
import MarkdownContent from './MarkdownContent';

type Props = {
  name: string;
  modelId: string;
  text: string;
  streaming: boolean;
  error?: string;
  /**
   * Optional clickable picker that replaces the static `name` label in the
   * header. When omitted (e.g. landing-page demo, historical turns rendered
   * server-side), the static name is shown.
   */
  picker?: React.ReactNode;
};

export default function ModelColumn({ name, modelId, text, streaming, error, picker }: Props) {
  const t = useTranslations('Chat');

  return (
    <div className="flex flex-col min-w-0 rounded-[var(--radius-card)] bg-paper-white border border-[rgba(0,0,0,0.06)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[rgba(0,0,0,0.04)] flex items-center gap-2 shrink-0">
        {picker ?? (
          <span
            className="text-deep-graphite"
            style={{
              fontSize: 'var(--text-body-sm)',
              letterSpacing: 'var(--text-body-sm--letter-spacing)',
            }}
          >
            {name}
          </span>
        )}
        <span
          className="text-cool-gray truncate"
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
        className="px-5 py-4 text-deep-graphite whitespace-pre-wrap"
        style={{
          fontSize: 'var(--text-body-sm)',
          lineHeight: 'var(--text-body-sm--line-height)',
          letterSpacing: 'var(--text-body-sm--letter-spacing)',
        }}
      >
        {error ? (
          <span className="text-alert-red">{error}</span>
        ) : text ? (
          <MarkdownContent>{text}</MarkdownContent>
        ) : streaming ? (
          <div className="space-y-2 pt-1">
            <div className="h-3 rounded bg-cool-gray/15 animate-pulse w-3/4" />
            <div className="h-3 rounded bg-cool-gray/15 animate-pulse w-1/2" />
          </div>
        ) : (
          <span className="text-cool-gray italic">{t('waiting')}</span>
        )}
      </div>
    </div>
  );
}
