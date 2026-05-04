'use client';

import Logo from '@/components/brand/Logo';

type Props = {
  onMenuToggle: () => void;
};

export default function MobileHeader({ onMenuToggle }: Props) {
  return (
    <header className="lg:hidden h-14 shrink-0 px-2 flex items-center gap-1 border-b border-[rgba(0,0,0,0.06)] bg-paper-white sticky top-0 z-30">
      <button
        type="button"
        onClick={onMenuToggle}
        aria-label="메뉴 열기"
        className="w-11 h-11 flex items-center justify-center rounded-[var(--radius-button)] text-deep-graphite hover:bg-ghost-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      <div className="flex items-center gap-2">
        <Logo size={22} />
        <span
          className="text-deep-graphite"
          style={{
            fontSize: 'var(--text-body-sm)',
            letterSpacing: 'var(--text-body-sm--letter-spacing)',
          }}
        >
          Agent Bot
        </span>
      </div>
    </header>
  );
}
