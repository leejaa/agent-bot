import { signIn } from '@/lib/auth';
import { getTranslations } from 'next-intl/server';
import { getModels } from '@/lib/models';
import Logo from '@/components/brand/Logo';
import { Link } from '@/i18n/navigation';
import GoogleButton from './GoogleButton';
import AppleButton from './AppleButton';

type PageProps = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default async function SignInPage({ searchParams }: PageProps) {
  const { next, error } = await searchParams;
  const callbackUrl = next ?? '/chat';
  const [t, tBrand, models] = await Promise.all([
    getTranslations('SignIn'),
    getTranslations('Brand'),
    getModels(),
  ]);
  const modelLabel = models.map((m) => m.displayName).join(' · ');

  return (
    <div className="w-full max-w-[360px] flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <Logo size={44} />
        <div className="text-center">
          <h1
            className="text-deep-graphite"
            style={{
              fontSize: 'var(--text-heading-sm)',
              lineHeight: 'var(--text-heading-sm--line-height)',
              letterSpacing: 'var(--text-heading-sm--letter-spacing)',
            }}
          >
            {tBrand('name')}
          </h1>
          <p
            className="text-deep-slate mt-1"
            style={{
              fontSize: 'var(--text-body-sm)',
              lineHeight: 'var(--text-body-sm--line-height)',
              letterSpacing: 'var(--text-body-sm--letter-spacing)',
            }}
          >
            {tBrand('subtagline', { models: modelLabel })}
          </p>
        </div>
      </div>

      <div
        className="w-full rounded-[var(--radius-card)] bg-paper-white p-[var(--spacing-card-padding)] flex flex-col gap-3 border border-[rgba(0,0,0,0.06)]"
        style={{ boxShadow: 'var(--shadow-elevated)' }}
      >
        {error && (
          <p
            className="text-alert-red text-center"
            style={{
              fontSize: 'var(--text-body-sm)',
              letterSpacing: 'var(--text-body-sm--letter-spacing)',
            }}
          >
            {t('error')}
          </p>
        )}

        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: callbackUrl });
          }}
        >
          <GoogleButton label={t('google')} />
        </form>

        <form
          action={async () => {
            'use server';
            await signIn('apple', { redirectTo: callbackUrl });
          }}
        >
          <AppleButton label={t('apple')} />
        </form>
      </div>

      <p
        className="text-cool-gray text-center"
        style={{
          fontSize: 'var(--text-caption)',
          lineHeight: 'var(--text-caption--line-height)',
          letterSpacing: 'var(--text-caption--letter-spacing)',
        }}
      >
        By continuing, you agree to our{' '}
        <Link href="/legal/terms" className="underline hover:text-deep-slate transition-colors">
          terms of service
        </Link>
        .
      </p>
    </div>
  );
}
