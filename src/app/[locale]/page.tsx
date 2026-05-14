import { Suspense } from 'react';
import dynamicImport from 'next/dynamic';
import { getModels, FALLBACK_MODELS, type ModelEntry } from '@/lib/models';
import LandingNav from '@/components/landing/LandingNav';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Pricing from '@/components/landing/Pricing';
import FAQ from '@/components/landing/FAQ';
import LandingFooter from '@/components/landing/LandingFooter';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Polymind?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A multi-AI chat that sends one prompt to GPT, Claude, and Gemini at the same time. You see all three answers side by side and pick the one that fits — without juggling tabs or copy-pasting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why not just use ChatGPT, Claude, or Gemini directly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Because no single AI is best at everything. If you already check answers across multiple models for important tasks, Polymind removes the friction — same workflow, but in one chat instead of three tabs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get started?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sign up with Google or Apple — no card needed. New accounts get 25 free credits (1 credit = 1 prompt to all three models at once).',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After your 25 free credits, Starter Pack is $9.99 for 25 credits and Pro Pack is $24.99 for 75 credits. No subscription — buy credits when you need them. Credits never expire.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where does my data go?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prompts and responses are stored in your account so you can revisit them. They are never used to train models — Polymind routes through Vercel AI Gateway, which has zero data retention by default. You can delete any conversation anytime.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I switch which AI models Polymind uses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — each of the three columns can be set to any chat-capable model on Vercel AI Gateway (100+ models). The default is the latest frontier GPT, Claude, and Gemini. Click any column header to swap.',
      },
    },
  ],
};

// HeroDemo pulls in the full chat component tree (TurnItem, ModelColumn,
// ChatInputView, the demo choreographer with its RAF loop). Splitting it
// into its own chunk keeps the main landing JS bundle lean while still
// SSR-rendering the demo (so the markup is in the initial HTML).
const HeroDemo = dynamicImport(() => import('@/components/landing/HeroDemo'));

// Fully static — every visitor gets the same prerendered HTML, served from
// Vercel's edge CDN. The auth-redirect for already-signed-in users is handled
// in the middleware (src/proxy.ts) so this page no longer needs to call
// `auth()` per request. Models load from the AI Gateway is wrapped in
// <Suspense> so it streams in without holding up the static shell.
export const dynamic = 'force-static';

export default async function RootPage() {
  return (
    <div className="min-h-screen bg-ghost-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LandingNav />
      <main>
        <Hero />
        <Suspense fallback={<HeroDemo models={[...FALLBACK_MODELS] as ModelEntry[]} />}>
          <HeroDemoServer />
        </Suspense>
        <Features />
        <FAQ />
        <Pricing />
      </main>
      <LandingFooter />
    </div>
  );
}

async function HeroDemoServer() {
  const models = await getModels();
  return <HeroDemo models={models} />;
}
