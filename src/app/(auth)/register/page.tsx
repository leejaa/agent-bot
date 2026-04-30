'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? '회원가입 실패');
        return;
      }
      router.push('/chat');
    } catch {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-xl font-semibold text-white mb-6">회원가입</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-zinc-400">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-zinc-400">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="8자 이상"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-zinc-500">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
