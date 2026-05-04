'use client';

import Logo from '@/components/brand/Logo';

const SUGGESTIONS = [
  '같은 질문에 세 모델이 어떻게 다르게 답할까?',
  '리액트 useEffect 자주 하는 실수 정리해줘',
  '회의록 핵심만 3줄로 요약하는 법',
];

type Props = {
  onPick: (text: string) => void;
};

export default function EmptyState({ onPick }: Props) {
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
            어떤 질문이든 던져보세요
          </h2>
          <p
            className="text-deep-slate"
            style={{
              fontSize: 'var(--text-body-sm)',
              lineHeight: 'var(--text-body-sm--line-height)',
              letterSpacing: 'var(--text-body-sm--letter-spacing)',
            }}
          >
            GPT-4o · Claude Sonnet · Gemini 2.5 Pro가 동시에 답합니다
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full pt-2">
          {SUGGESTIONS.map((s) => (
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
