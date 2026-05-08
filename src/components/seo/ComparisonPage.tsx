import type { Comparison } from '@/lib/seo/types';
import { getModel } from '@/lib/seo/models';
import LandingNav from '@/components/landing/LandingNav';
import LandingFooter from '@/components/landing/LandingFooter';
import { Link } from '@/i18n/navigation';
import ModelSpecCard from './ModelSpecCard';
import ComparisonVerdict from './ComparisonVerdict';
import TaskMatrix from './TaskMatrix';
import WhenToPickPanel from './WhenToPickPanel';
import FaqList from './FaqList';
import PolymindCTA from './PolymindCTA';

type Props = {
  comparison: Comparison;
};

/**
 * Shared layout for /compare/[slug] pages. Pulls all unique content from
 * the Comparison record so the template stays thin and each page reads as
 * its own argument, not a templated stub.
 */
export default function ComparisonPage({ comparison }: Props) {
  const a = getModel(comparison.modelA);
  const b = getModel(comparison.modelB);

  return (
    <div className="min-h-screen bg-ghost-white">
      <LandingNav />

      <article className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/compare"
            className="inline-block text-deep-slate hover:text-primary mb-6"
            style={{
              fontSize: 'var(--text-body-sm)',
              letterSpacing: 'var(--text-body-sm--letter-spacing)',
            }}
          >
            ← All comparisons
          </Link>

          <header className="mb-8">
            <p
              className="text-deep-slate mb-3"
              style={{
                fontSize: 'var(--text-caption)',
                letterSpacing: 'var(--text-caption--letter-spacing)',
              }}
            >
              <time dateTime={comparison.publishedAt}>
                Last updated {formatDate(comparison.updatedAt ?? comparison.publishedAt)}
              </time>
            </p>
            <h1
              className="text-deep-graphite"
              style={{
                fontSize: 'var(--text-heading-lg)',
                lineHeight: 'var(--text-heading-lg--line-height)',
                letterSpacing: 'var(--text-heading-lg--letter-spacing)',
              }}
            >
              {comparison.h1}
            </h1>
          </header>

          {comparison.lede.split('\n\n').map((para, i) => (
            <p
              key={i}
              className="text-deep-graphite my-4"
              style={{
                fontSize: 'var(--text-body)',
                lineHeight: 'var(--text-body--line-height)',
                letterSpacing: 'var(--text-body--letter-spacing)',
              }}
            >
              {para}
            </p>
          ))}

          <ComparisonVerdict comparison={comparison} />

          <section className="grid sm:grid-cols-2 gap-4 my-8">
            <ModelSpecCard model={a} />
            <ModelSpecCard model={b} />
          </section>

          <TaskMatrix comparison={comparison} />

          <section className="grid sm:grid-cols-2 gap-8 my-12">
            <WhenToPickPanel
              headline={comparison.whenToPickA.headline}
              bullets={comparison.whenToPickA.bullets}
            />
            <WhenToPickPanel
              headline={comparison.whenToPickB.headline}
              bullets={comparison.whenToPickB.bullets}
            />
          </section>

          <PolymindCTA
            headline={`Run ${a.shortName} and ${b.shortName} side by side`}
            body={`Stop guessing which model wins for your work. Send one prompt to ${a.shortName}, ${b.shortName}, and Gemini at the same time and compare answers in five minutes. Free during open beta.`}
          />

          <FaqList faqs={comparison.faqs} />
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
