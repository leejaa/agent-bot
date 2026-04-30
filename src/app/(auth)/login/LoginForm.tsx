'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/chat';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? '로그인 실패');
        return;
      }
      router.push(next);
    } catch {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
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
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
      >
        {loading ? '로그인 중...' : '로그인'}
      </button>

      <p className="text-center text-sm text-zinc-500">
        계정이 없으신가요?{' '}
        <Link href="/register" className="text-blue-400 hover:underline">
          회원가입
        </Link>
      </p>
    </form>
  );
}
