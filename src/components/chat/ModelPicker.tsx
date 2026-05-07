'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ProviderKey } from '@/lib/models';

type Pricing = { inputPerToken: number; outputPerToken: number };

export type ModelOption = {
  id: string;
  name: string;
  provider: string;
  description: string;
  pricing: Pricing | null;
};

type Props = {
  slot: ProviderKey;
  /** The model currently displayed in this column. */
  currentModelId: string;
  /** Provider's default model (used by the "Use default" reset option). */
  defaultModelId: string;
  /** Whether the user has explicitly chosen this model (vs falling back to default). */
  isOverridden: boolean;
  /** Catalog of selectable models. */
  options: ModelOption[];
  /** Called with new model id, or `null` to revert to default. Returns a promise. */
  onPick: (next: string | null) => Promise<void>;
};

export default function ModelPicker({
  slot,
  currentModelId,
  defaultModelId,
  isOverridden,
  options,
  onPick,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [saving, setSaving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const grouped = useMemo(() => groupByProvider(options, query), [options, query]);

  async function pick(next: string | null) {
    setSaving(true);
    try {
      await onPick(next);
      setOpen(false);
    } finally {
      setSaving(false);
    }
  }

  const current = options.find((m) => m.id === currentModelId);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Change model for slot ${slot}`}
        className="flex items-center gap-1 text-deep-graphite hover:text-primary transition-colors"
        style={{
          fontSize: 'var(--text-body-sm)',
          letterSpacing: 'var(--text-body-sm--letter-spacing)',
        }}
      >
        <span>{current?.name ?? currentModelId}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-30 w-[min(360px,calc(100vw-2rem))] max-h-[420px] flex flex-col rounded-[var(--radius-card)] border border-[rgba(0,0,0,0.08)] bg-paper-white shadow-[var(--shadow-elevated)] overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search models…"
            className="w-full px-4 py-3 border-b border-[rgba(0,0,0,0.06)] bg-transparent text-deep-graphite placeholder:text-cool-gray focus:outline-none"
            style={{
              fontSize: 'var(--text-body-sm)',
              letterSpacing: 'var(--text-body-sm--letter-spacing)',
            }}
            autoFocus
          />

          <div className="flex-1 overflow-y-auto">
            {/* Use default reset row */}
            <button
              type="button"
              onClick={() => pick(null)}
              disabled={saving || !isOverridden}
              className="w-full text-left px-4 py-2.5 hover:bg-ghost-white disabled:text-cool-gray disabled:hover:bg-transparent disabled:cursor-not-allowed border-b border-[rgba(0,0,0,0.04)]"
              style={{
                fontSize: 'var(--text-body-sm)',
                letterSpacing: 'var(--text-body-sm--letter-spacing)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-primary">Use default</span>
                {!isOverridden && (
                  <span className="text-cool-gray" style={{ fontSize: 'var(--text-caption)' }}>
                    current
                  </span>
                )}
              </div>
              <div
                className="text-deep-slate"
                style={{ fontSize: 'var(--text-caption)', letterSpacing: 'var(--text-caption--letter-spacing)' }}
              >
                {options.find((m) => m.id === defaultModelId)?.name ?? defaultModelId}
              </div>
            </button>

            {grouped.map(([provider, models]) => (
              <div key={provider}>
                <div
                  className="sticky top-0 px-4 py-1.5 bg-ghost-white text-deep-slate uppercase"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.06em',
                    fontWeight: 500,
                  }}
                >
                  {provider}
                </div>
                {models.map((m) => {
                  const isCurrent = m.id === currentModelId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => pick(m.id)}
                      disabled={saving || isCurrent}
                      className={`w-full text-left px-4 py-2.5 hover:bg-ghost-white disabled:cursor-not-allowed ${isCurrent ? 'bg-primary/5' : ''}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-deep-graphite truncate" style={{ fontSize: 'var(--text-body-sm)' }}>
                          {m.name}
                        </span>
                        {isCurrent && (
                          <span className="text-primary shrink-0" style={{ fontSize: 'var(--text-caption)' }}>
                            current
                          </span>
                        )}
                      </div>
                      <div
                        className="text-deep-slate truncate"
                        style={{ fontSize: 'var(--text-caption)', letterSpacing: 'var(--text-caption--letter-spacing)' }}
                      >
                        {formatPricing(m.pricing)}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}

            {grouped.length === 0 && (
              <div
                className="px-4 py-6 text-center text-cool-gray"
                style={{ fontSize: 'var(--text-body-sm)' }}
              >
                No models match.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function groupByProvider(options: ModelOption[], query: string): [string, ModelOption[]][] {
  const q = query.trim().toLowerCase();
  const filtered = q
    ? options.filter((m) => m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q))
    : options;

  const map = new Map<string, ModelOption[]>();
  for (const m of filtered) {
    const list = map.get(m.provider) ?? [];
    list.push(m);
    map.set(m.provider, list);
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function formatPricing(p: Pricing | null): string {
  if (!p) return 'pricing unavailable';
  // tokens are per-token; convert to per-1M-tokens ($/1M)
  const inP = (p.inputPerToken * 1_000_000).toFixed(2);
  const outP = (p.outputPerToken * 1_000_000).toFixed(2);
  return `$${inP} in · $${outP} out per 1M tokens`;
}
