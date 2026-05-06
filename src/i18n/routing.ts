import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ko'] as const,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // Always default to English regardless of the visitor's Accept-Language
  // header. A Korean cookie set by the LocaleSwitcher still takes precedence,
  // so users who explicitly switch keep their choice across visits.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
