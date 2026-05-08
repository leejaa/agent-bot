import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllPosts } from '@/lib/blog/posts';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://usepolymind.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Locale-aware static pages
  const staticPaths: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/sign-in', priority: 0.7 },
    { path: '/blog', priority: 0.8 },
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

  // Blog posts (only emit the canonical /blog/<slug> — Korean variant is the
  // same English content; we don't duplicate in the sitemap).
  const posts = await getAllPosts();
  for (const post of posts) {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return entries;
}
