'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

async function fetchBalance(): Promise<{ balance: number }> {
  const res = await fetch('/api/credits/balance');
  if (!res.ok) throw new Error('Failed to load credits');
  return res.json();
}

async function startCheckout(): Promise<{ url: string }> {
  const res = await fetch('/api/checkout', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to start checkout');
  return res.json();
}

export default function CreditBalance() {
  const t = useTranslations('Credits');

  const { data } = useQuery({
    queryKey: ['credit-balance'],
    queryFn: fetchBalance,
    refetchOnWindowFocus: true,
    refetchInterval: 30_000,
    initialData: { balance: 0 },
  });

  const checkoutMutation = useMutation({
    mutationFn: startCheckout,
    onSuccess: (d) => {
      window.location.href = d.url;
    },
  });

  const balance = data?.balance ?? 0;
  const isLow = balance > 0 && balance <= 3;
  const isOut = balance <= 0;

  const tone = isOut
    ? 'bg-[rgba(247,116,99,0.08)] border-[rgba(247,116,99,0.2)]'
    : isLow
      ? 'bg-[rgba(255,138,51,0.08)] border-[rgba(255,138,51,0.2)]'
      : 'bg-ghost-white border-[rgba(0,0,0,0.06)]';

  return (
    <div className="px-3 pb-2">
      <div className={`rounded-[var(--radius-button)] border px-3 py-2.5 flex items-center gap-3 ${tone}`}>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-deep-graphite"
              style={{
                fontSize: 'var(--text-body-sm)',
                letterSpacing: 'var(--text-body-sm--letter-spacing)',
                fontWeight: 600,
              }}
            >
              {balance}
            </span>
            <span
              className="text-deep-slate"
              style={{
                fontSize: 'var(--text-caption)',
                letterSpacing: 'var(--text-caption--letter-spacing)',
              }}
            >
              {t('label')}
            </span>
          </div>
          {(isLow || isOut) && (
            <p
              className={isOut ? 'text-alert-red' : 'text-primary'}
              style={{
                fontSize: '11px',
                letterSpacing: '0.01em',
                marginTop: 1,
              }}
            >
              {isOut ? t('outTitle') : t('lowWarning')}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => checkoutMutation.mutate()}
          disabled={checkoutMutation.isPending}
          className="shrink-0 px-2.5 h-7 rounded-[var(--radius-button)] bg-primary text-paper-white hover:brightness-110 disabled:opacity-60 transition-all"
          style={{
            fontSize: '11px',
            letterSpacing: '0.01em',
            fontWeight: 500,
          }}
        >
          {checkoutMutation.isPending ? t('buying') : t('buy')}
        </button>
      </div>
    </div>
  );
}
