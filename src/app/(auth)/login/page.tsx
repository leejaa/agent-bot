import { Suspense } from 'react';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-xl font-semibold text-white mb-6">로그인</h1>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
