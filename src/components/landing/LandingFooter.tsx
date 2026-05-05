import { getTranslations } from 'next-intl/server';
import Logo from '@/components/brand/Logo';

export default async function LandingFooter() {
  const tBrand = await getTranslations('Brand');

  return (
    <footer className="px-4 sm:px-6 py-10 border-t border-[rgba(0,0,0,0.06)]">
      <div className="max-w-5xl mx-auto flex items-center gap-2">
        <Logo size={20} />
        <span
          className="text-deep-graphite"
          style={{
            fontSize: 'var(--text-body-sm)',
            letterSpacing: 'var(--text-body-sm--letter-spacing)',
          }}
        >
          {tBrand('name')}
        </span>
      </div>
    </footer>
  );
}
