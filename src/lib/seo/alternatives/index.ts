import type { Alternative } from '../types';
import { chatgptAlternative } from './chatgpt';

export const ALTERNATIVES: Alternative[] = [chatgptAlternative];

export function getAlternative(slug: string): Alternative | undefined {
  return ALTERNATIVES.find((a) => a.slug === slug);
}

export function getAlternativeSlugs(): string[] {
  return ALTERNATIVES.map((a) => a.slug);
}
