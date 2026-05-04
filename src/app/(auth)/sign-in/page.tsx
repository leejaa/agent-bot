import { signIn } from '@/lib/auth';
import Logo from '@/components/brand/Logo';
import GoogleButton from './GoogleButton';
import AppleButton from './AppleButton';

type PageProps = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default async function SignInPage({ searchParams }: PageProps) {
  const { next, error } = await searchParams;
  const callbackUrl = next ?? '/chat';

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
            Agent Bot
          </h1>
          <p
            className="text-deep-slate mt-1"
            style={{
              fontSize: 'var(--text-body-sm)',
              lineHeight: 'var(--text-body-sm--line-height)',
              letterSpacing: 'var(--text-body-sm--letter-spacing)',
            }}
          >
            세 가지 AI에게 동시에 묻고 비교해보세요
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
            로그인에 실패했습니다. 다시 시도해주세요.
          </p>
        )}

        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: callbackUrl });
          }}
        >
          <GoogleButton />
        </form>

        <form
          action={async () => {
            'use server';
            await signIn('apple', { redirectTo: callbackUrl });
          }}
        >
          <AppleButton />
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
        계속하면 서비스 이용에 동의하는 것으로 간주됩니다
      </p>
    </div>
  );
}
