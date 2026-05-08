import type { Comparison } from '../types';
import { gptVsClaude } from './gpt-vs-claude';
import { claudeVsGemini } from './claude-vs-gemini';
import { gptVsGemini } from './gpt-vs-gemini';

export const COMPARISONS: Comparison[] = [
  gptVsClaude,
  claudeVsGemini,
  gptVsGemini,
];

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

export function getComparisonSlugs(): string[] {
  return COMPARISONS.map((c) => c.slug);
}
