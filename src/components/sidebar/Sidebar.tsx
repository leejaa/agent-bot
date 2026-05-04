'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import Logo from '@/components/brand/Logo';
import CreditBalance from './CreditBalance';

type Conversation = {
  id: string;
  title: string | null;
  updatedAt: string | null;
};

type Props = {
  initialConversations: Conversation[];
  userEmail: string;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

async function fetchConversations(): Promise<Conversation[]> {
  const res = await fetch('/api/conversations');
  if (!res.ok) throw new Error('Failed to fetch conversations');
  return res.json();
}

export default function Sidebar({
  initialConversations,
  userEmail,
  mobileOpen = false,
  onMobileClose,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);
  const t = useTranslations('Sidebar');
  const tBrand = useTranslations('Brand');

  const { data: conversations = initialConversations } = useQuery({
    queryKey: ['conversations'],
    queryFn: fetchConversations,
    initialData: initialConversations,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (!mobileOpen || !onMobileClose) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onMobileClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen, onMobileClose]);

  async function handleLogout() {
    setLoggingOut(true);
    await signOut({ redirectTo: '/sign-in' });
  }

  function handleNewChat() {
    router.push('/chat');
    onMobileClose?.();
  }

  function handleNavClick() {
    onMobileClose?.();
  }

  return (
    <>
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onMobileClose}
        aria-hidden
      />

      <aside
        aria-hidden={!mobileOpen ? undefined : false}
        className={`
          flex flex-col shrink-0
          bg-paper-white border-r border-[rgba(0,0,0,0.06)]
          transition-transform duration-200 ease-out
          lg:static lg:translate-x-0 lg:w-[260px] lg:h-full
          fixed top-0 bottom-0 left-0 z-50 w-[280px]
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="px-4 pt-5 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo size={26} />
            <span
              className="text-deep-graphite"
              style={{
                fontSize: 'var(--text-body)',
                letterSpacing: 'var(--text-body--letter-spacing)',
              }}
            >
              {tBrand('name')}
            </span>
          </div>
          <button
            type="button"
            onClick={onMobileClose}
            aria-label={t('closeMenu')}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-[var(--radius-button)] text-deep-slate hover:bg-ghost-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-3 pb-2">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 px-3 h-11 lg:h-9 rounded-[var(--radius-button)] text-deep-slate hover:bg-ghost-white hover:text-deep-graphite transition-colors"
            style={{
              fontSize: 'var(--text-body-sm)',
              letterSpacing: 'var(--text-body-sm--letter-spacing)',
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {t('newChat')}
          </button>
        </div>

        <div className="px-4 pt-3 pb-1">
          <p
            className="text-cool-gray uppercase"
            style={{
              fontSize: '11px',
              letterSpacing: '0.04em',
            }}
          >
            {t('recentLabel')}
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5">
          {conversations.length === 0 && (
            <p
              className="text-cool-gray px-3 py-2"
              style={{
                fontSize: 'var(--text-body-sm)',
                letterSpacing: 'var(--text-body-sm--letter-spacing)',
              }}
            >
              {t('empty')}
            </p>
          )}
          {conversations.map((c) => {
            const active = pathname === `/chat/${c.id}`;
            return (
              <Link
                key={c.id}
                href={`/chat/${c.id}`}
                onClick={handleNavClick}
                className={`block truncate rounded-[var(--radius-button)] px-3 py-2.5 lg:py-1.5 transition-colors ${
                  active
                    ? 'bg-ghost-white text-deep-graphite'
                    : 'text-deep-slate hover:bg-ghost-white hover:text-deep-graphite'
                }`}
                style={{
                  fontSize: 'var(--text-body-sm)',
                  letterSpacing: 'var(--text-body-sm--letter-spacing)',
                }}
              >
                {c.title ?? t('newChat')}
              </Link>
            );
          })}
        </nav>

        <CreditBalance />

        <div className="px-3 py-3 border-t border-[rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-[var(--radius-button)] hover:bg-ghost-white transition-colors group">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="text-paper-white" style={{ fontSize: '12px' }}>
                {(userEmail[0] ?? 'U').toUpperCase()}
              </span>
            </div>
            <p
              className="flex-1 truncate text-deep-graphite"
              style={{
                fontSize: 'var(--text-body-sm)',
                letterSpacing: 'var(--text-body-sm--letter-spacing)',
              }}
            >
              {userEmail}
            </p>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              aria-label={t('logout')}
              className="text-cool-gray hover:text-deep-graphite transition-colors shrink-0 w-9 h-9 flex items-center justify-center rounded-[var(--radius-button)]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
