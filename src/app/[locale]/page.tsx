import { Suspense } from 'react';
import dynamicImport from 'next/dynamic';
import { getModels, FALLBACK_MODELS, type ModelEntry } from '@/lib/models';
import { IS_BETA } from '@/lib/beta';
import LandingNav from '@/components/landing/LandingNav';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Pricing from '@/components/landing/Pricing';
import BetaNotice from '@/components/landing/BetaNotice';
import FAQ from '@/components/landing/FAQ';
import LandingFooter from '@/components/landing/LandingFooter';

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
      <LandingNav />
      <main>
        <Hero />
        <Suspense fallback={<HeroDemo models={[...FALLBACK_MODELS] as ModelEntry[]} />}>
          <HeroDemoServer />
        </Suspense>
        <Features />
        <FAQ />
        {IS_BETA ? <BetaNotice /> : <Pricing />}
      </main>
      <LandingFooter />
    </div>
  );
}

async function HeroDemoServer() {
  const models = await getModels();
  return <HeroDemo models={models} />;
}
