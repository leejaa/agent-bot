'use client';

import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

async function fetchBalance(): Promise<{ balance: number }> {
  const res = await fetch('/api/credits/balance');
  if (!res.ok) throw new Error('Failed to load credits');
  return res.json();
}

async function startCheckout(pack: 'starter' | 'pro'): Promise<{ url: string }> {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pack }),
  });
  if (!res.ok) throw new Error('Failed to start checkout');
  return res.json();
}

export function useCreditBalance() {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ['credit-balance'],
    queryFn: fetchBalance,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: 30_000,
    staleTime: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (url.searchParams.get('purchased') !== '1') return;
    queryClient.invalidateQueries({ queryKey: ['credit-balance'] });
    url.searchParams.delete('purchased');
    window.history.replaceState(null, '', url.toString());
  }, [queryClient]);

  const checkoutMutation = useMutation({
    mutationFn: startCheckout,
    onSuccess: (d) => {
      window.location.href = d.url;
    },
  });

  const balance = data?.balance ?? 0;

  return {
    balance,
    isLoading: isPending,
    isLow: !isPending && balance > 0 && balance <= 3,
    isOut: !isPending && balance <= 0,
    buy: checkoutMutation.mutate,
    isBuying: checkoutMutation.isPending,
    buyingPack: checkoutMutation.variables as 'starter' | 'pro' | undefined,
  };
}
