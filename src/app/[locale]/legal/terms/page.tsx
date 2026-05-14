import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import LandingNav from '@/components/landing/LandingNav';
import LandingFooter from '@/components/landing/LandingFooter';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Terms of Service — Polymind',
  robots: { index: false },
};

const EFFECTIVE_DATE = 'May 13, 2026';
const CONTACT_EMAIL = 'leejahun0@gmail.com';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ghost-white">
      <LandingNav />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <h1
          className="text-deep-graphite mb-2"
          style={{ fontSize: 'var(--text-heading)', lineHeight: 'var(--text-heading--line-height)' }}
        >
          Terms of Service
        </h1>
        <p className="text-deep-slate mb-10" style={{ fontSize: 'var(--text-body-sm)' }}>
          Effective {EFFECTIVE_DATE}
        </p>

        <div
          className="text-deep-graphite space-y-8"
          style={{
            fontSize: 'var(--text-body)',
            lineHeight: 'var(--text-body--line-height)',
          }}
        >
          <section>
            <h2 className="font-semibold mb-3">1. Acceptance</h2>
            <p>
              By creating an account or using Polymind ("the Service"), you agree to these Terms of
              Service. If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-3">2. Description of Service</h2>
            <p>
              Polymind is a web application that routes your prompts to multiple AI language models
              simultaneously and displays their responses side by side. It is provided on an "as is"
              and "as available" basis.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-3">3. Accounts and Credits</h2>
            <p>
              You may sign in with Google or Apple. New accounts receive 25 free credits on
              sign-up. Credits are consumed when you submit a prompt. Credits have no
              cash value and are non-refundable unless required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-3">4. Acceptable Use</h2>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-deep-slate">
              <li>Generate content that is illegal, harmful, or violates third-party rights.</li>
              <li>Attempt to reverse-engineer, scrape, or abuse the platform.</li>
              <li>Circumvent usage limits or credit controls.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold mb-3">5. Data and Privacy</h2>
            <p>
              Prompts and responses are stored in your account so you can revisit them. They are
              never used to train AI models. Polymind routes requests through Vercel AI Gateway,
              which applies zero data retention by default. You can delete any conversation at any
              time from the app. For full details, contact us at{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-3">6. Intellectual Property</h2>
            <p>
              You retain ownership of prompts you submit. AI-generated responses are subject to the
              terms of the underlying model providers (OpenAI, Anthropic, Google). Polymind does not
              claim ownership of generated content.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-3">7. Disclaimer and Limitation of Liability</h2>
            <p>
              The Service is provided without warranty of any kind. Polymind is not liable for the
              accuracy or completeness of AI-generated responses. To the maximum extent permitted by
              law, our liability is limited to the amount you paid for credits in the twelve months
              preceding any claim.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-3">8. Changes</h2>
            <p>
              We may update these Terms at any time. Continued use of the Service after notice of
              changes constitutes acceptance. Material changes will be communicated via email or
              in-app notice.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-3">9. Contact</h2>
            <p>
              Questions about these Terms?{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary hover:underline"
              >
                Email us
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-[rgba(0,0,0,0.06)]">
          <Link href="/" className="text-primary hover:underline" style={{ fontSize: 'var(--text-body-sm)' }}>
            ← Back to Polymind
          </Link>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
