import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllPosts } from '@/lib/blog/posts';
import { COMPARISONS } from '@/lib/seo/comparisons';
import { ALTERNATIVES } from '@/lib/seo/alternatives';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://usepolymind.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Locale-aware static pages
  const staticPaths: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/sign-in', priority: 0.7 },
    { path: '/blog', priority: 0.8 },
    { path: '/compare', priority: 0.8 },
    { path: '/alternatives', priority: 0.8 },
  ];

  for (const { path, priority } of staticPaths) {
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      entries.push({
        url: `${SITE_URL}${prefix}${path}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority,
      });
    }
  }

  // Blog posts — emit only the canonical /blog/<slug> URL.
  const posts = await getAllPosts();
  for (const post of posts) {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  // Comparison pages
  for (const c of COMPARISONS) {
    entries.push({
      url: `${SITE_URL}/compare/${c.slug}`,
      lastModified: new Date(c.updatedAt ?? c.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // Alternative pages
  for (const a of ALTERNATIVES) {
    entries.push({
      url: `${SITE_URL}/alternatives/${a.slug}`,
      lastModified: new Date(a.updatedAt ?? a.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
