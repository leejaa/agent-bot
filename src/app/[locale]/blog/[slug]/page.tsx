import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllSlugs, getPostBySlug } from '@/lib/blog/posts';
import { PostBody } from '@/components/blog/PostBody';
import { Link } from '@/i18n/navigation';
import LandingNav from '@/components/landing/LandingNav';
import LandingFooter from '@/components/landing/LandingFooter';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://usepolymind.app';
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;

export const dynamic = 'force-static';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  // One param set per slug per locale; with as-needed prefix the default
  // English `/blog/[slug]` and the Korean `/ko/blog/[slug]` both resolve.
  const locales: ('en' | 'ko')[] = ['en', 'ko'];
  return slugs.flatMap((slug) => locales.map((locale) => ({ slug, locale })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${slug}`;
  const heroImage = post.heroImage ?? OG_IMAGE_URL;

  return {
    title: `${post.title} — Polymind`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      siteName: 'Polymind',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: post.author ? [post.author] : ['Polymind'],
      images: [{ url: heroImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [heroImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author ?? 'Polymind',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Polymind',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand/polymind-logo-512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
    image: post.heroImage ?? OG_IMAGE_URL,
    keywords: post.tags?.join(', '),
  };

  return (
    <div className="min-h-screen bg-ghost-white">
      <LandingNav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-block text-deep-slate hover:text-primary mb-6"
            style={{
              fontSize: 'var(--text-body-sm)',
              letterSpacing: 'var(--text-body-sm--letter-spacing)',
            }}
          >
            ← All posts
          </Link>

          <header className="mb-10">
            <p
              className="text-deep-slate mb-3"
              style={{
                fontSize: 'var(--text-caption)',
                letterSpacing: 'var(--text-caption--letter-spacing)',
              }}
            >
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {' · '}
              {post.readingMinutes} min read
            </p>
            <h1
              className="text-deep-graphite"
              style={{
                fontSize: 'var(--text-heading-lg)',
                lineHeight: 'var(--text-heading-lg--line-height)',
                letterSpacing: 'var(--text-heading-lg--letter-spacing)',
              }}
            >
              {post.title}
            </h1>
            <p
              className="text-deep-slate mt-4"
              style={{
                fontSize: 'var(--text-subheading)',
                lineHeight: 'var(--text-subheading--line-height)',
                letterSpacing: 'var(--text-subheading--letter-spacing)',
              }}
            >
              {post.description}
            </p>
          </header>

          <div className="mb-16">
            <PostBody source={post.source} />
          </div>

          <footer className="border-t border-[rgba(0,0,0,0.08)] pt-8">
            <div className="rounded-[var(--radius-card)] bg-paper-white border border-[rgba(0,0,0,0.06)] p-6 flex flex-col gap-3">
              <h2
                className="text-deep-graphite"
                style={{
                  fontSize: 'var(--text-heading-sm)',
                  lineHeight: 'var(--text-heading-sm--line-height)',
                  letterSpacing: 'var(--text-heading-sm--letter-spacing)',
                }}
              >
                Try the workflow yourself
              </h2>
              <p
                className="text-deep-slate"
                style={{
                  fontSize: 'var(--text-body-sm)',
                  lineHeight: 'var(--text-body-sm--line-height)',
                  letterSpacing: 'var(--text-body-sm--letter-spacing)',
                }}
              >
                Polymind sends one prompt to GPT, Claude, and Gemini at the same
                time and shows their answers side by side. Free during open beta.
              </p>
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center px-5 h-11 rounded-[var(--radius-button)] bg-primary text-paper-white hover:brightness-110 transition-all self-start"
                style={{
                  fontSize: 'var(--text-body)',
                  letterSpacing: 'var(--text-body--letter-spacing)',
                }}
              >
                Get started
              </Link>
            </div>
          </footer>
        </div>
      </article>

      <LandingFooter />
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
