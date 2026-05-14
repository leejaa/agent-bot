type Props = {
  onBuy: (pack: 'starter' | 'pro') => void;
  isBuying: boolean;
  buyingPack?: 'starter' | 'pro';
};

export default function CreditBuyButtons({ onBuy, isBuying, buyingPack }: Props) {
  return (
    <div className="shrink-0 flex flex-col gap-1">
      <button
        type="button"
        onClick={() => onBuy('starter')}
        disabled={isBuying}
        className="px-2.5 h-6 rounded-[var(--radius-button)] bg-deep-graphite/10 text-deep-graphite hover:bg-deep-graphite/20 disabled:opacity-60 transition-all"
        style={{ fontSize: '10px', letterSpacing: '0.01em', fontWeight: 500 }}
      >
        {isBuying && buyingPack === 'starter' ? '…' : '25 cr · $9.99'}
      </button>
      <button
        type="button"
        onClick={() => onBuy('pro')}
        disabled={isBuying}
        className="px-2.5 h-6 rounded-[var(--radius-button)] bg-primary text-paper-white hover:brightness-110 disabled:opacity-60 transition-all"
        style={{ fontSize: '10px', letterSpacing: '0.01em', fontWeight: 500 }}
      >
        {isBuying && buyingPack === 'pro' ? '…' : '75 cr · $24.99'}
      </button>
    </div>
  );
}
