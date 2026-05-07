import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://usepolymind.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/sign-in'];
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of paths) {
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      entries.push({
        url: `${SITE_URL}${prefix}${path}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: path === '' ? 1 : 0.7,
      });
    }
  }

  return entries;
}
