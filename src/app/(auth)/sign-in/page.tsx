import { signIn } from '@/lib/auth';
import GoogleButton from './GoogleButton';
import AppleButton from './AppleButton';

type PageProps = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default async function SignInPage({ searchParams }: PageProps) {
  const { next, error } = await searchParams;
  const callbackUrl = next ?? '/chat';

  return (
    <div className="w-full max-w-sm">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-xl font-semibold text-white mb-2">로그인</h1>
        <p className="text-sm text-zinc-500 mb-6">계정이 없어도 자동으로 가입됩니다.</p>

        {error && (
          <p className="mb-4 text-sm text-red-400">로그인에 실패했습니다. 다시 시도해주세요.</p>
        )}

        <div className="flex flex-col gap-3">
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
      </div>
    </div>
  );
}
