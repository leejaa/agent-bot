'use client';

import ModelColumn from './ModelColumn';
import type { Turn } from './useChat';

const MODELS = [
  { key: 'openai' as const, name: 'GPT-4o', modelId: 'openai/gpt-4o' },
  { key: 'anthropic' as const, name: 'Claude', modelId: 'anthropic/claude-sonnet-4.6' },
  { key: 'google' as const, name: 'Gemini', modelId: 'google/gemini-2.5-pro' },
];

type Props = {
  turn: Turn;
};

export default function TurnItem({ turn }: Props) {
  return (
    <div className="px-6 pt-6 pb-4">
      {/* User message */}
      <div className="mb-4 flex items-start gap-3">
        <span
          className="shrink-0 px-2 py-0.5 rounded-[var(--radius-pill)] bg-ghost-white text-deep-slate"
          style={{
            fontSize: 'var(--text-caption)',
            letterSpacing: 'var(--text-caption--letter-spacing)',
          }}
        >
          질문
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

      {/* 3-column model responses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 min-h-[160px]">
        {MODELS.map((m) => (
          <ModelColumn
            key={m.key}
            name={m.name}
            modelId={m.modelId}
            text={turn[m.key].text}
            streaming={turn[m.key].streaming}
            error={turn[m.key].error}
          />
        ))}
      </div>
    </div>
  );
}
