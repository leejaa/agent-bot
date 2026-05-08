import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import LandingNav from '@/components/landing/LandingNav';
import LandingFooter from '@/components/landing/LandingFooter';
import { COMPARISONS } from '@/lib/seo/comparisons';
import { getModel } from '@/lib/seo/models';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://usepolymind.app';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Compare AI models — GPT, Claude, Gemini head-to-head | Polymind',
  description:
    'Honest, task-by-task comparisons of GPT, Claude, and Gemini. No benchmark trivia — real verdicts on writing, coding, multimodal, and tool use.',
  alternates: { canonical: `${SITE_URL}/compare` },
  openGraph: {
    title: 'Compare AI models — Polymind',
    description:
      'Honest, task-by-task comparisons of GPT, Claude, and Gemini. No benchmark trivia.',
    url: `${SITE_URL}/compare`,
    type: 'website',
  },
};

export default function CompareIndexPage() {
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
              Compare AI models
            </h1>
            <p
              className="text-deep-slate mt-3 max-w-2xl"
              style={{
                fontSize: 'var(--text-subheading)',
                lineHeight: 'var(--text-subheading--line-height)',
                letterSpacing: 'var(--text-subheading--letter-spacing)',
              }}
            >
              Honest, task-by-task comparisons of GPT, Claude, and Gemini. The right
              answer is rarely &ldquo;one wins&rdquo; — it&apos;s &ldquo;one wins at
              what?&rdquo;
            </p>
          </header>

          <ul className="divide-y divide-[rgba(0,0,0,0.06)] border-y border-[rgba(0,0,0,0.06)]">
            {COMPARISONS.map((c) => {
              const a = getModel(c.modelA);
              const b = getModel(c.modelB);
              return (
                <li key={c.slug} className="py-6">
                  <Link href={`/compare/${c.slug}`} className="block group">
                    <p
                      className="text-deep-slate mb-1"
                      style={{
                        fontSize: 'var(--text-caption)',
                        letterSpacing: 'var(--text-caption--letter-spacing)',
                      }}
                    >
                      {a.shortName} vs {b.shortName}
                    </p>
                    <h2
                      className="text-deep-graphite group-hover:text-primary transition-colors"
                      style={{
                        fontSize: 'var(--text-heading-sm)',
                        lineHeight: 'var(--text-heading-sm--line-height)',
                        letterSpacing: 'var(--text-heading-sm--letter-spacing)',
                      }}
                    >
                      {c.h1}
                    </h2>
                    <p
                      className="text-deep-slate mt-2"
                      style={{
                        fontSize: 'var(--text-body-sm)',
                        lineHeight: 'var(--text-body-sm--line-height)',
                        letterSpacing: 'var(--text-body-sm--letter-spacing)',
                      }}
                    >
                      {c.metaDescription}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
