'use client';

import ChatInputView from '@/components/chat/ChatInputView';
import TurnItem from '@/components/chat/TurnItem';
import type { ModelEntry } from '@/lib/models';
import { useDemoChoreographer } from './useDemoChoreographer';

type Props = {
  models: ModelEntry[];
};

/**
 * Auto-playing landing demo. Composes the real chat components
 * (TurnItem + ChatInputView) with a synthetic Turn driven by
 * useDemoChoreographer — so any visual change in the actual chat
 * automatically flows here.
 *
 * Plays only while in the viewport. Loops forever.
 */
export default function HeroDemo({ models }: Props) {
  const { phase, inputValue, turn, opacity, containerRef } = useDemoChoreographer();

  return (
    <section ref={containerRef} className="px-4 sm:px-6 pb-20">
      <div className="max-w-5xl mx-auto rounded-[var(--radius-card)] border border-[rgba(0,0,0,0.08)] bg-paper-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(0,0,0,0.06)] bg-ghost-white">
          <div className="flex gap-1.5" aria-hidden>
            <span className="w-2.5 h-2.5 rounded-full bg-cool-gray/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-cool-gray/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-cool-gray/70" />
          </div>
          <span
            className="text-deep-slate"
            style={{
              fontSize: 'var(--text-caption)',
              letterSpacing: 'var(--text-caption--letter-spacing)',
            }}
          >
            polymind.app
          </span>
        </div>

        <div
          className="flex flex-col min-h-[440px] md:min-h-[480px] transition-opacity duration-300"
          style={{ opacity }}
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {turn ? (
              <TurnItem turn={turn} models={models} noBleed />
            ) : (
              <IdleHint typing={phase === 'typing'} />
            )}
          </div>

          <ChatInputView
            value={inputValue}
            placeholder="Ask anything..."
            sendAriaLabel="Send"
            isStreaming={phase === 'streaming'}
            readOnly
          />
        </div>
      </div>
    </section>
  );
}

function IdleHint({ typing }: { typing: boolean }) {
  return (
    <div className="h-full min-h-[300px] flex items-center justify-center px-6">
      <p
        className="text-deep-slate text-center"
        style={{
          fontSize: 'var(--text-body-sm)',
          lineHeight: 'var(--text-body-sm--line-height)',
          letterSpacing: 'var(--text-body-sm--letter-spacing)',
          opacity: typing ? 0.5 : 1,
          transition: 'opacity 200ms',
        }}
      >
        Ask one question — get answers from every top AI, side by side.
      </p>
    </div>
  );
}
