import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getAllPosts } from '@/lib/blog/posts';
import LandingNav from '@/components/landing/LandingNav';
import LandingFooter from '@/components/landing/LandingFooter';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://usepolymind.app';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog — Polymind',
  description:
    'Hands-on comparisons, prompt patterns, and reflections on using multiple AI models in parallel.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Blog — Polymind',
    description:
      'Hands-on comparisons, prompt patterns, and reflections on using multiple AI models in parallel.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-ghost-white">
      <LandingNav />
      <main className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1
              className="text-deep-graphite"
              style={{
                fontSize: 'var(--text-heading-lg)',
                lineHeight: 'var(--text-heading-lg--line-height)',
                letterSpacing: 'var(--text-heading-lg--letter-spacing)',
              }}
            >
              Blog
            </h1>
            <p
              className="text-deep-slate mt-3 max-w-2xl"
              style={{
                fontSize: 'var(--text-subheading)',
                lineHeight: 'var(--text-subheading--line-height)',
                letterSpacing: 'var(--text-subheading--letter-spacing)',
              }}
            >
              Hands-on comparisons, prompt patterns, and notes from using
              multiple AI models side by side.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="text-deep-slate">No posts yet.</p>
          ) : (
            <ul className="divide-y divide-[rgba(0,0,0,0.06)] border-y border-[rgba(0,0,0,0.06)]">
              {posts.map((post) => (
                <li key={post.slug} className="py-6">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block group"
                  >
                    <p
                      className="text-deep-slate mb-1"
                      style={{
                        fontSize: 'var(--text-caption)',
                        letterSpacing: 'var(--text-caption--letter-spacing)',
                      }}
                    >
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                    </p>
                    <h2
                      className="text-deep-graphite group-hover:text-primary transition-colors"
                      style={{
                        fontSize: 'var(--text-heading-sm)',
                        lineHeight: 'var(--text-heading-sm--line-height)',
                        letterSpacing: 'var(--text-heading-sm--letter-spacing)',
                      }}
                    >
                      {post.title}
                    </h2>
                    <p
                      className="text-deep-slate mt-2"
                      style={{
                        fontSize: 'var(--text-body-sm)',
                        lineHeight: 'var(--text-body-sm--line-height)',
                        letterSpacing: 'var(--text-body-sm--letter-spacing)',
                      }}
                    >
                      {post.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
