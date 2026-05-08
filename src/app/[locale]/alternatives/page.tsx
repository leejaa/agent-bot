import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import LandingNav from '@/components/landing/LandingNav';
import LandingFooter from '@/components/landing/LandingFooter';
import { ALTERNATIVES } from '@/lib/seo/alternatives';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://usepolymind.app';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'AI tool alternatives — honest comparisons | Polymind',
  description:
    'Looking for an alternative to ChatGPT, Claude, or Gemini? Honest landscape, real tradeoffs, and how Polymind fits in.',
  alternates: { canonical: `${SITE_URL}/alternatives` },
  openGraph: {
    title: 'AI tool alternatives — Polymind',
    description: 'Honest landscape and real tradeoffs — beyond a single AI subscription.',
    url: `${SITE_URL}/alternatives`,
    type: 'website',
  },
};

export default function AlternativesIndexPage() {
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
              AI tool alternatives
            </h1>
            <p
              className="text-deep-slate mt-3 max-w-2xl"
              style={{
                fontSize: 'var(--text-subheading)',
                lineHeight: 'var(--text-subheading--line-height)',
                letterSpacing: 'var(--text-subheading--letter-spacing)',
              }}
            >
              Most people searching for an AI alternative don&apos;t want to replace —
              they want to expand. Honest landscape per product.
            </p>
          </header>

          <ul className="divide-y divide-[rgba(0,0,0,0.06)] border-y border-[rgba(0,0,0,0.06)]">
            {ALTERNATIVES.map((a) => (
              <li key={a.slug} className="py-6">
                <Link href={`/alternatives/${a.slug}`} className="block group">
                  <p
                    className="text-deep-slate mb-1"
                    style={{
                      fontSize: 'var(--text-caption)',
                      letterSpacing: 'var(--text-caption--letter-spacing)',
                    }}
                  >
                    {a.productName} alternatives
                  </p>
                  <h2
                    className="text-deep-graphite group-hover:text-primary transition-colors"
                    style={{
                      fontSize: 'var(--text-heading-sm)',
                      lineHeight: 'var(--text-heading-sm--line-height)',
                      letterSpacing: 'var(--text-heading-sm--letter-spacing)',
                    }}
                  >
                    {a.h1}
                  </h2>
                  <p
                    className="text-deep-slate mt-2"
                    style={{
                      fontSize: 'var(--text-body-sm)',
                      lineHeight: 'var(--text-body-sm--line-height)',
                      letterSpacing: 'var(--text-body-sm--letter-spacing)',
                    }}
                  >
                    {a.metaDescription}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
