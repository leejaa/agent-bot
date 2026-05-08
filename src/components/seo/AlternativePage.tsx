import type { Alternative } from '@/lib/seo/types';
import LandingNav from '@/components/landing/LandingNav';
import LandingFooter from '@/components/landing/LandingFooter';
import { Link } from '@/i18n/navigation';
import FaqList from './FaqList';
import PolymindCTA from './PolymindCTA';

type Props = {
  alternative: Alternative;
};

/**
 * Shared layout for /alternatives/[slug] pages. Each Alternative record
 * carries the unique narrative — this template just arranges it.
 */
export default function AlternativePage({ alternative }: Props) {
  return (
    <div className="min-h-screen bg-ghost-white">
      <LandingNav />

      <article className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/alternatives"
            className="inline-block text-deep-slate hover:text-primary mb-6"
            style={{
              fontSize: 'var(--text-body-sm)',
              letterSpacing: 'var(--text-body-sm--letter-spacing)',
            }}
          >
            ← All alternatives
          </Link>

          <header className="mb-8">
            <p
              className="text-deep-slate mb-3"
              style={{
                fontSize: 'var(--text-caption)',
                letterSpacing: 'var(--text-caption--letter-spacing)',
              }}
            >
              <time dateTime={alternative.publishedAt}>
                Last updated {formatDate(alternative.updatedAt ?? alternative.publishedAt)}
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
              {alternative.h1}
            </h1>
          </header>

          {alternative.lede.split('\n\n').map((para, i) => (
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

          <section className="my-12">
            <h2
              className="text-deep-graphite mb-6"
              style={{
                fontSize: 'var(--text-heading)',
                lineHeight: 'var(--text-heading--line-height)',
                letterSpacing: 'var(--text-heading--letter-spacing)',
              }}
            >
              Why people search for {alternative.productName} alternatives
            </h2>
            <ul className="space-y-6">
              {alternative.reasonsToSwitch.map((reason) => (
                <li key={reason.headline}>
                  <h3
                    className="text-deep-graphite mb-2"
                    style={{
                      fontSize: 'var(--text-heading-sm)',
                      lineHeight: 'var(--text-heading-sm--line-height)',
                      letterSpacing: 'var(--text-heading-sm--letter-spacing)',
                    }}
                  >
                    {reason.headline}
                  </h3>
                  <p
                    className="text-deep-slate"
                    style={{
                      fontSize: 'var(--text-body)',
                      lineHeight: 'var(--text-body--line-height)',
                      letterSpacing: 'var(--text-body--letter-spacing)',
                    }}
                  >
                    {reason.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="my-12 rounded-[var(--radius-card)] bg-paper-white border border-[rgba(0,0,0,0.06)] p-6">
            <h2
              className="text-deep-graphite mb-3"
              style={{
                fontSize: 'var(--text-heading)',
                lineHeight: 'var(--text-heading--line-height)',
                letterSpacing: 'var(--text-heading--letter-spacing)',
              }}
            >
              Why Polymind
            </h2>
            {alternative.whyPolymind.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="text-deep-graphite my-3"
                style={{
                  fontSize: 'var(--text-body)',
                  lineHeight: 'var(--text-body--line-height)',
                  letterSpacing: 'var(--text-body--letter-spacing)',
                }}
              >
                {para}
              </p>
            ))}
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center px-5 h-11 rounded-[var(--radius-button)] bg-primary text-paper-white hover:brightness-110 transition-all mt-4"
              style={{
                fontSize: 'var(--text-body)',
                letterSpacing: 'var(--text-body--letter-spacing)',
              }}
            >
              Try Polymind free
            </Link>
          </section>

          <section className="my-12">
            <h2
              className="text-deep-graphite mb-6"
              style={{
                fontSize: 'var(--text-heading)',
                lineHeight: 'var(--text-heading--line-height)',
                letterSpacing: 'var(--text-heading--letter-spacing)',
              }}
            >
              Other {alternative.productName} alternatives worth considering
            </h2>
            <ul className="space-y-5 border-t border-[rgba(0,0,0,0.06)] pt-5">
              {alternative.otherAlternatives.map((alt) => (
                <li key={alt.name}>
                  <h3
                    className="text-deep-graphite mb-1"
                    style={{
                      fontSize: 'var(--text-heading-sm)',
                      lineHeight: 'var(--text-heading-sm--line-height)',
                      letterSpacing: 'var(--text-heading-sm--letter-spacing)',
                    }}
                  >
                    {alt.name}
                  </h3>
                  <p
                    className="text-deep-graphite mb-1"
                    style={{
                      fontSize: 'var(--text-body-sm)',
                      lineHeight: 'var(--text-body-sm--line-height)',
                      letterSpacing: 'var(--text-body-sm--letter-spacing)',
                    }}
                  >
                    {alt.description}
                  </p>
                  <p
                    className="text-deep-slate"
                    style={{
                      fontSize: 'var(--text-body-sm)',
                      lineHeight: 'var(--text-body-sm--line-height)',
                      letterSpacing: 'var(--text-body-sm--letter-spacing)',
                    }}
                  >
                    <span className="font-medium">Tradeoff: </span>
                    {alt.tradeoff}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <FaqList faqs={alternative.faqs} />

          <PolymindCTA />
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
