'use client';

import { FormEvent, useEffect, useRef } from 'react';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  isStreaming?: boolean;
};

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  isStreaming = false,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  const canSend = !disabled && !isStreaming && value.trim().length > 0;

  return (
    <div className="px-6 pt-2 pb-6">
      <form
        onSubmit={handleSubmit}
        className="relative max-w-4xl mx-auto rounded-[var(--radius-card)] bg-paper-white border border-[rgba(0,0,0,0.08)] focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(255,138,51,0.16)] transition-shadow"
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (canSend) onSubmit();
            }
          }}
          disabled={disabled || isStreaming}
          rows={1}
          placeholder="질문을 입력하세요  ⌥  Shift + Enter 줄바꿈"
          className="w-full resize-none bg-transparent px-5 pt-4 pb-3 pr-14 text-deep-graphite placeholder:text-cool-gray focus:outline-none disabled:opacity-60"
          style={{
            fontSize: 'var(--text-body)',
            lineHeight: 'var(--text-body--line-height)',
            letterSpacing: 'var(--text-body--letter-spacing)',
            maxHeight: '160px',
            overflowY: 'auto',
          }}
        />

        <button
          type="submit"
          disabled={!canSend}
          aria-label="전송"
          className="absolute right-3 bottom-3 w-9 h-9 flex items-center justify-center rounded-[var(--radius-button)] bg-primary text-paper-white hover:brightness-110 disabled:bg-cool-gray disabled:cursor-not-allowed transition-all"
        >
          {isStreaming ? (
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l14-7-7 14-2-6-5-1z" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
