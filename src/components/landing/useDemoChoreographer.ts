'use client';

import { useEffect, useRef, useState } from 'react';
import type { Turn } from '@/components/chat/useChat';
import {
  DEMO_ANSWERS,
  DEMO_QUESTION,
  DEMO_TIMING,
  DEMO_TOTAL_MS,
} from './demoScript';

export type DemoPhase =
  | 'idle'
  | 'typing'
  | 'submitted'
  | 'streaming'
  | 'done'
  | 'fadeout';

type Snapshot = {
  phase: DemoPhase;
  inputValue: string;
  turn: Turn | null;
  opacity: number;
};

type Output = Snapshot & {
  containerRef: React.RefObject<HTMLDivElement | null>;
  isInView: boolean;
};

const PHASE_ORDER: { name: DemoPhase; durationMs: number }[] = [
  { name: 'idle', durationMs: DEMO_TIMING.idleMs },
  { name: 'typing', durationMs: DEMO_TIMING.typingMs },
  { name: 'submitted', durationMs: DEMO_TIMING.submittedMs },
  { name: 'streaming', durationMs: DEMO_TIMING.streamingMs },
  { name: 'done', durationMs: DEMO_TIMING.doneMs },
  { name: 'fadeout', durationMs: DEMO_TIMING.fadeoutMs },
];

/**
 * Drives the landing-page demo. Pure timing logic — given the current
 * elapsed time within a 27-second cycle, return what the user should see.
 *
 * Pauses (no requestAnimationFrame loop) when the demo container is
 * scrolled out of view, then resumes from the same point so visitors don't
 * miss the start of a cycle.
 *
 * Re-renders run at ~60fps while in view; React reconciliation on text-only
 * prop changes is cheap.
 */
export function useDemoChoreographer(): Output {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [snapshot, setSnapshot] = useState<Snapshot>(() => computeSnapshot(0));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let raf = 0;
    const baseAt = performance.now();
    let baseElapsed = 0;

    const loop = () => {
      const elapsed = (baseElapsed + (performance.now() - baseAt)) % DEMO_TOTAL_MS;
      const next = computeSnapshot(elapsed);
      setSnapshot((prev) => (snapshotsEqual(prev, next) ? prev : next));
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      // Preserve elapsed time so the cycle resumes from the same point next mount.
      baseElapsed = (baseElapsed + (performance.now() - baseAt)) % DEMO_TOTAL_MS;
      cancelAnimationFrame(raf);
    };
  }, [isInView]);

  return {
    ...snapshot,
    containerRef,
    isInView,
  };
}

// ---------- pure helpers ----------

function computeSnapshot(elapsed: number): Snapshot {
  const { name: phase, offset, duration } = locatePhase(elapsed);

  switch (phase) {
    case 'idle':
      return { phase, inputValue: '', turn: null, opacity: 1 };

    case 'typing': {
      const progress = duration === 0 ? 1 : Math.min(offset / duration, 1);
      const charCount = Math.floor(progress * DEMO_QUESTION.length);
      return {
        phase,
        inputValue: DEMO_QUESTION.slice(0, charCount),
        turn: null,
        opacity: 1,
      };
    }

    case 'submitted':
      return {
        phase,
        inputValue: '',
        turn: makeTurn({ openai: '', anthropic: '', google: '' }, true),
        opacity: 1,
      };

    case 'streaming': {
      const texts = {
        openai: sliceFor('openai', offset),
        anthropic: sliceFor('anthropic', offset),
        google: sliceFor('google', offset),
      };
      return {
        phase,
        inputValue: '',
        turn: makeTurn(texts, true),
        opacity: 1,
      };
    }

    case 'done':
      return {
        phase,
        inputValue: '',
        turn: makeTurn(DEMO_ANSWERS, false),
        opacity: 1,
      };

    case 'fadeout': {
      const progress = duration === 0 ? 1 : Math.min(offset / duration, 1);
      return {
        phase,
        inputValue: '',
        turn: makeTurn(DEMO_ANSWERS, false),
        opacity: 1 - progress,
      };
    }
  }
}

function locatePhase(elapsed: number): {
  name: DemoPhase;
  offset: number;
  duration: number;
} {
  let cursor = 0;
  for (const p of PHASE_ORDER) {
    if (elapsed < cursor + p.durationMs) {
      return { name: p.name, offset: elapsed - cursor, duration: p.durationMs };
    }
    cursor += p.durationMs;
  }
  // Edge case: elapsed === DEMO_TOTAL_MS — return last frame of the last phase.
  const last = PHASE_ORDER[PHASE_ORDER.length - 1];
  return { name: last.name, offset: last.durationMs, duration: last.durationMs };
}

function sliceFor(provider: 'openai' | 'anthropic' | 'google', offsetMs: number): string {
  const full = DEMO_ANSWERS[provider];
  const dur = DEMO_TIMING.perModelMs[provider];
  const progress = Math.min(offsetMs / dur, 1);
  return full.slice(0, Math.floor(progress * full.length));
}

function makeTurn(
  texts: { openai: string; anthropic: string; google: string },
  streaming: boolean
): Turn {
  return {
    id: 'demo-turn',
    userMessage: DEMO_QUESTION,
    openai: {
      text: texts.openai,
      streaming: streaming && texts.openai.length < DEMO_ANSWERS.openai.length,
    },
    anthropic: {
      text: texts.anthropic,
      streaming: streaming && texts.anthropic.length < DEMO_ANSWERS.anthropic.length,
    },
    google: {
      text: texts.google,
      streaming: streaming && texts.google.length < DEMO_ANSWERS.google.length,
    },
  };
}

function snapshotsEqual(a: Snapshot, b: Snapshot): boolean {
  if (a.phase !== b.phase) return false;
  if (a.inputValue !== b.inputValue) return false;
  if (a.opacity !== b.opacity) return false;
  if (a.turn === b.turn) return true;
  if (!a.turn || !b.turn) return false;
  return (
    a.turn.openai.text === b.turn.openai.text &&
    a.turn.anthropic.text === b.turn.anthropic.text &&
    a.turn.google.text === b.turn.google.text &&
    a.turn.openai.streaming === b.turn.openai.streaming &&
    a.turn.anthropic.streaming === b.turn.anthropic.streaming &&
    a.turn.google.streaming === b.turn.google.streaming
  );
}
