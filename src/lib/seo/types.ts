import type { AIModelId } from './models';

/** Winner of a single task in a head-to-head comparison. */
export type TaskWinner = AIModelId | 'tie';

export type Faq = {
  question: string;
  answer: string;
};

export type Comparison = {
  /** URL slug, e.g. "gpt-vs-claude". */
  slug: string;
  modelA: AIModelId;
  modelB: AIModelId;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** 1-2 paragraph intro shown above the verdict box. */
  lede: string;
  verdict: {
    /** Sentence completing "Pick {modelA} for…" — keep under ~80 chars. */
    pickA: string;
    pickB: string;
  };
  /** 8-10 task rows. The mix should be deliberate — favorable, unfavorable,
   *  and tie cases together so the page doesn't read as one-sided. */
  taskMatrix: Array<{
    task: string;
    winner: TaskWinner;
    reasoning: string;
  }>;
  whenToPickA: {
    headline: string;
    bullets: string[];
  };
  whenToPickB: {
    headline: string;
    bullets: string[];
  };
  faqs: Faq[];
  publishedAt: string;
  updatedAt?: string;
};

export type Alternative = {
  /** URL slug, e.g. "chatgpt". */
  slug: string;
  /** Display name of the product being compared against. */
  productName: string;
  productUrl?: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** 1-2 paragraph intro. */
  lede: string;
  /** Why people search for an alternative — write each reason in 2-3 sentences. */
  reasonsToSwitch: Array<{
    headline: string;
    body: string;
  }>;
  /** Polymind's positioning narrative for this competitor (~100-150 words). */
  whyPolymind: string;
  /** Other alternatives readers might also consider — short, honest. */
  otherAlternatives: Array<{
    name: string;
    description: string;
    tradeoff: string;
  }>;
  faqs: Faq[];
  publishedAt: string;
  updatedAt?: string;
};
