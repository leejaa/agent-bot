export interface ShotVerdict {
  gpt: string;
  claude: string;
  gemini: string;
}

export interface ShotData {
  id: string;
  /** Each element = one line of the hook (stagger-animated). Max 3 lines. */
  hook: string[];
  /** The prompt shown to all 3 models. Keep under 40 chars for legibility. */
  prompt: string;
  responses: {
    gpt: string;
    claude: string;
    gemini: string;
  };
  /** One-line characteristic per model, shown in the verdict slide. */
  verdict: ShotVerdict;
}
