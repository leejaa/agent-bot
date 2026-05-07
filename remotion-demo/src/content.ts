/**
 * Demo content — kept identical to `agent-bot/src/components/landing/demoScript.ts`
 * so the Remotion render and the in-page HeroDemo show the same conversation.
 */

export const QUESTION = "Write a follow-up email after my job interview";

export const ANSWERS = {
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
} as const;

export const MODEL_LABELS = {
  openai: { name: "GPT-5.5", id: "openai/gpt-5.5" },
  anthropic: { name: "Claude Opus 4.7", id: "anthropic/claude-opus-4.7" },
  google: { name: "Gemini 3 Pro", id: "google/gemini-3-pro-preview" },
} as const;
