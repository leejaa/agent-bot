import { auth } from '@/lib/auth';
import { redirect } from '@/i18n/navigation';
import { getModels } from '@/lib/models';
import { IS_BETA } from '@/lib/beta';
import LandingNav from '@/components/landing/LandingNav';
import Hero from '@/components/landing/Hero';
import HeroDemo from '@/components/landing/HeroDemo';
import Features from '@/components/landing/Features';
import Pricing from '@/components/landing/Pricing';
import BetaNotice from '@/components/landing/BetaNotice';
import LandingFooter from '@/components/landing/LandingFooter';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function RootPage({ params }: Props) {
  const { locale } = await params;
  const session = await auth();

  // Authenticated users go straight to chat
  if (session?.user?.id) {
    redirect({ href: '/chat', locale: locale as 'en' | 'ko' });
    return null;
  }

  const models = await getModels();

  return (
    <div className="min-h-screen bg-ghost-white">
      <LandingNav />
      <main>
        <Hero />
        <HeroDemo models={models} />
        <Features />
        {IS_BETA ? <BetaNotice /> : <Pricing />}
      </main>
      <LandingFooter />
    </div>
  );
}
