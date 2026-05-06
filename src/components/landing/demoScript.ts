/**
 * Static content + timing for the landing-page demo. The demo's only
 * volatile knobs live here — to update what visitors see (different
 * question, different answers, faster/slower timing) edit this file alone.
 *
 * The choreographer hook reads these numbers; the HeroDemo component reads
 * the texts. Neither component holds copy of its own.
 */

export const DEMO_QUESTION = 'Write a follow-up email after my job interview';

/**
 * Three answers in deliberately different voices so the value proposition
 * ("compare top AI models side by side") reads at a glance.
 *  - openai (GPT)        : structured template
 *  - anthropic (Claude)  : warm prose
 *  - google (Gemini)     : best-practices + sample
 */
export const DEMO_ANSWERS: Record<'openai' | 'anthropic' | 'google', string> = {
  openai: `Subject: Thank you for today

Hi Sarah,

Really enjoyed our conversation about the team's roadmap. I'm excited about the role — especially the chance to work on the analytics platform.

Let me know if there's anything else I can share.

Best,
Alex`,

  anthropic: `Hi Sarah,

Thanks for the chat today — your point about how the team prototypes ideas really stuck with me. I came away even more excited about joining.

Anything else I can share, just say the word.

Alex`,

  google: `Best practices: send within 24h, reference one specific moment, reiterate your fit.

Sample:

Hi Sarah, thanks for today. Our discussion about cross-team collaboration reinforced my interest. My background in product analytics aligns directly — looking forward to next steps.

Alex`,
};

/**
 * Phase durations in milliseconds. The choreographer walks these in order
 * and loops. Total ≈ 27s, leaving a small buffer under the 30s budget.
 *
 * Each model finishes at a slightly different point during `streaming`
 * to mimic real LLM latency (Gemini fastest, Claude slowest).
 */
export const DEMO_TIMING = {
  idleMs: 1500,
  typingMs: 1800, // ~26 chars/sec for the 47-char question
  submittedMs: 500,
  streamingMs: 16000,
  doneMs: 5000,
  fadeoutMs: 2500,

  // Per-model fill durations within `streamingMs`. After their own duration,
  // a model sits at 100% for the remainder of the streaming phase.
  perModelMs: {
    openai: 14000,
    anthropic: 16000,
    google: 12000,
  },
} as const;

export const DEMO_TOTAL_MS =
  DEMO_TIMING.idleMs +
  DEMO_TIMING.typingMs +
  DEMO_TIMING.submittedMs +
  DEMO_TIMING.streamingMs +
  DEMO_TIMING.doneMs +
  DEMO_TIMING.fadeoutMs;
