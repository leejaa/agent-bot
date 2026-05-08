import type { Comparison } from '../types';

export const claudeVsGemini: Comparison = {
  slug: 'claude-vs-gemini',
  modelA: 'claude',
  modelB: 'gemini',
  metaTitle: 'Claude vs Gemini (2026): Which AI model fits your work?',
  metaDescription:
    "Claude Opus 4.7 vs Gemini 3 Pro across writing, coding, multimodal, long-context, and Google Workspace integration. Hands-on verdict, no benchmark theater.",
  h1: 'Claude vs Gemini in 2026: writing depth meets context scale',
  lede: `Claude and Gemini are the most *different* of the three frontier models — and that's the comparison most "vs." articles flatten. Claude is the disciplined writer with sharp judgment on instruction-following. Gemini is the integration-heavy workhorse with a 2M-token context window and tight Google Workspace plumbing. They rarely compete head-to-head on the same job; the right one depends on what your day actually looks like.

This page works through real workloads — writing, code review, document analysis, multimodal, and integration — and tells you which one actually wins where. Run the same prompts in Polymind and the verdict will land on your screen, side by side.`,
  verdict: {
    pickA: 'writing-heavy work, code review, and disciplined instruction-following.',
    pickB: 'massive context, native multimodal, and Google ecosystem integration.',
  },
  taskMatrix: [
    {
      task: 'Long-form writing (essays, blog posts, copy)',
      winner: 'claude',
      reasoning:
        "Claude's prose is more confident, less hedged, and reads aloud cleanly. Gemini writes competently but tends toward the encyclopedic — informative but flat. For anything you'll publish, Claude needs less editing.",
    },
    {
      task: 'Customer-facing copy with tone constraints',
      winner: 'claude',
      reasoning:
        "Tone discipline is Claude's strongest single capability. Tell it 'direct but warm, don't apologize' and it obeys; Gemini occasionally drifts toward formal-corporate by default and needs explicit redirection.",
    },
    {
      task: 'Code review on an existing diff',
      winner: 'claude',
      reasoning:
        "Claude catches subtle bugs (race conditions, off-by-one, error handling) more reliably and invents fewer fake nitpicks. Gemini is improving fast but still produces more 'general best practice' commentary that doesn't engage with the specific code in front of it.",
    },
    {
      task: 'Code generation from a blank slate',
      winner: 'tie',
      reasoning:
        "Both are competent. Claude's output is more readable and idiomatic; Gemini's is sometimes more correct on first attempt because of stronger grounding in current docs. Pick whichever fits your existing workflow.",
    },
    {
      task: 'Long-context analysis (100K+ tokens)',
      winner: 'gemini',
      reasoning:
        "Gemini's 2M-token window is roughly 10x Claude's effective working size, and it holds up — it can ingest entire codebases, hour-long meeting transcripts, or 500-page PDFs and still answer questions about specific passages. Claude is excellent up to ~200K but doesn't compete at scale.",
    },
    {
      task: 'Image and video understanding',
      winner: 'gemini',
      reasoning:
        'Gemini was designed multimodal-first and shows it. It handles charts, diagrams, video frames, and audio in a single context with less brittle behavior than Claude. Claude handles still images well but lags on video and audio entirely.',
    },
    {
      task: 'Real-time web information',
      winner: 'gemini',
      reasoning:
        "Gemini's deep Google integration means it can pull current search results into reasoning naturally. Claude requires explicit web tools and is generally behind on time-sensitive queries.",
    },
    {
      task: 'Following exact format constraints (JSON, schemas)',
      winner: 'claude',
      reasoning:
        "When a prompt says 'JSON only, no prose,' Claude obeys more consistently. Gemini's structured output has improved meaningfully in 2026 but still occasionally prefixes explanatory text. For programmatic pipelines, Claude wastes fewer retries.",
    },
    {
      task: 'Cost per token for production workloads',
      winner: 'gemini',
      reasoning:
        "Gemini is materially cheaper than Claude across input and output token tiers in 2026. For high-volume tasks where quality is comparable, the price difference can be 3-5x in Gemini's favor.",
    },
    {
      task: 'Reasoning under ambiguity',
      winner: 'claude',
      reasoning:
        'Claude is more likely to flag when a problem is underspecified or when a request has internal contradictions. Gemini will more often plow ahead and answer the question it inferred. For high-stakes work where wrong-but-confident is worse than slow, Claude is safer.',
    },
  ],
  whenToPickA: {
    headline: 'Pick Claude when…',
    bullets: [
      'Your output is mostly writing — copy, documentation, customer comms, internal memos.',
      'You review or refactor existing code more than you generate from scratch.',
      "You need strict instruction-following (formats, exclusions, tones).",
      'Calibration matters more than speed — you\'d rather be told "I don\'t know" than get a confident wrong answer.',
    ],
  },
  whenToPickB: {
    headline: 'Pick Gemini when…',
    bullets: [
      'You routinely process documents, codebases, or transcripts longer than 200K tokens.',
      'Your work is multimodal — video, audio, charts, complex diagrams.',
      'You live in Google Workspace and need tight Docs/Sheets/Drive integration.',
      'Cost per token matters — you\'re running production volume and the price gap is significant.',
    ],
  },
  faqs: [
    {
      question: 'Is Gemini better than Claude in 2026?',
      answer:
        "Better at *what* matters more than 'better' overall. Gemini wins on context size, multimodal, real-time information, and cost. Claude wins on writing quality, code review judgment, and instruction discipline. Most teams that take the comparison seriously use both — Gemini for ingestion-heavy and multimodal work, Claude for output where quality matters.",
    },
    {
      question: "Why is Gemini's context window so much larger?",
      answer:
        "Google's research and infrastructure investments have prioritized context length aggressively. The 2M-token window is real — it actually retrieves and reasons across that scale, not just accepts it. The tradeoff is that for shorter prompts, you don't see a benefit and may pay for capability you're not using.",
    },
    {
      question: 'Can I use Claude and Gemini side by side?',
      answer:
        "Yes. Polymind sends one prompt to GPT, Claude, and Gemini at the same time and shows the answers next to each other. For Claude-vs-Gemini specifically, side-by-side comparison is the only way to feel the prose difference and the multimodal gap — they don't show up in benchmarks.",
    },
    {
      question: 'Which is better for coding?',
      answer:
        "For *reviewing* code, Claude is meaningfully better — sharper bug detection, more disciplined about not changing behavior. For *writing* new code, the two are roughly even, with Gemini sometimes more correct on first attempt because of stronger grounding in current documentation. For long codebases (100K+ tokens), Gemini's context advantage matters more than per-task quality.",
    },
    {
      question: 'Is Gemini good for writing?',
      answer:
        "Gemini writes competently — it's not bad. But it tends toward encyclopedic, informative-but-flat prose. For anything you'll publish or send to customers, Claude needs less editing. For internal drafts, summaries, or research notes, Gemini is fine and often faster.",
    },
  ],
  publishedAt: '2026-05-08',
};
