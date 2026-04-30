'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

type Conversation = {
  id: string;
  title: string | null;
  updated_at: string;
};

type Props = {
  initialConversations: Conversation[];
  userEmail: string;
};

async function fetchConversations(): Promise<Conversation[]> {
  const res = await fetch('/api/conversations');
  if (!res.ok) throw new Error('Failed to fetch conversations');
  return res.json();
}

export default function Sidebar({ initialConversations, userEmail }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const { data: conversations = initialConversations } = useQuery({
    queryKey: ['conversations'],
    queryFn: fetchConversations,
    initialData: initialConversations,
    refetchOnWindowFocus: true,
  });

  async function handleLogout() {
    setLoggingOut(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  }

  return (
    <aside className="w-60 shrink-0 flex flex-col bg-zinc-950 border-r border-zinc-800 h-full">
      <div className="p-3 border-b border-zinc-800">
        <button
          onClick={() => router.push('/chat')}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          새 대화
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {conversations.length === 0 && (
          <p className="text-xs text-zinc-600 px-3 py-2">대화 없음</p>
        )}
        {conversations.map((c) => {
          const active = pathname === `/chat/${c.id}`;
          return (
            <Link
              key={c.id}
              href={`/chat/${c.id}`}
              className={`block truncate rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              {c.title ?? '새 대화'}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-zinc-400 truncate">{userEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors shrink-0"
          >
            로그아웃
          </button>
        </div>
      </div>
    </aside>
  );
}
