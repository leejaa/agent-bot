'use client';

import { useTranslations } from 'next-intl';
import { useCreditBalance } from '@/hooks/useCreditBalance';
import CreditBuyButtons from './CreditBuyButtons';

export default function CreditBalance() {
  const t = useTranslations('Credits');
  const { balance, isLoading, isLow, isOut, buy, isBuying, buyingPack } = useCreditBalance();

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
            {isLoading ? (
              <div className="h-4 w-7 rounded bg-cool-gray/20 animate-pulse" />
            ) : (
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
            )}
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
              style={{ fontSize: '11px', letterSpacing: '0.01em', marginTop: 1 }}
            >
              {isOut ? t('outTitle') : t('lowWarning')}
            </p>
          )}
        </div>
        <CreditBuyButtons onBuy={buy} isBuying={isBuying} buyingPack={buyingPack} />
      </div>
    </div>
  );
}
