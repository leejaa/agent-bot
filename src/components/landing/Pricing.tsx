import { getTranslations } from 'next-intl/server';
import PricingCard from './PricingCard';

export default async function Pricing() {
  const t = await getTranslations('Landing');

  return (
    <section id="pricing" className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2
            className="text-deep-graphite"
            style={{
              fontSize: 'var(--text-heading)',
              lineHeight: 'var(--text-heading--line-height)',
              letterSpacing: 'var(--text-heading--letter-spacing)',
            }}
          >
            {t('pricingTitle')}
          </h2>
          <p
            className="text-deep-slate mt-2"
            style={{
              fontSize: 'var(--text-body)',
              lineHeight: 'var(--text-body--line-height)',
              letterSpacing: 'var(--text-body--letter-spacing)',
            }}
          >
            {t('pricingSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <PricingCard
            label={t('pricingFree')}
            price={t('pricingFreePrice')}
            unit=""
            desc={t('pricingFreeDesc')}
            ctaLabel={t('ctaPrimary')}
          />
          <PricingCard
            label={t('pricingPro')}
            price={t('pricingProPrice')}
            unit={t('pricingProUnit')}
            desc={t('pricingProDesc')}
            ctaLabel={t('ctaPrimary')}
          />
          <PricingCard
            label={t('pricingProPack')}
            price={t('pricingProPackPrice')}
            unit={t('pricingProPackUnit')}
            desc={t('pricingProPackDesc')}
            ctaLabel={t('ctaPrimary')}
            highlighted
            badge="BEST VALUE"
          />
        </div>

        <p
          className="text-cool-gray text-center mt-6"
          style={{
            fontSize: 'var(--text-caption)',
            lineHeight: 'var(--text-caption--line-height)',
            letterSpacing: 'var(--text-caption--letter-spacing)',
          }}
        >
          {t('pricingNeverExpire')}
        </p>
      </div>
    </section>
  );
}
