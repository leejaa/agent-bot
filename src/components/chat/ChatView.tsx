'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import EmptyState from './EmptyState';
import TurnItem from './TurnItem';
import ChatInput from './ChatInput';
import ModelPicker, { type ModelOption } from './ModelPicker';
import { useMultiChat, Turn } from './useChat';
import type { ModelEntry, ProviderKey } from '@/lib/models';

type Props = {
  conversationId: string | null;
  initialTurns?: Turn[];
  userEmail: string;
  models: ModelEntry[];
};

const SLOT_INDEX: Record<ProviderKey, 1 | 2 | 3> = {
  openai: 1,
  anthropic: 2,
  google: 3,
};

type UserModelsResponse = {
  slots: Array<{
    slot: ProviderKey;
    slotKey: 'slot1' | 'slot2' | 'slot3';
    modelId: string;
    isDefault: boolean;
    defaultModelId: string;
    meta: { id: string; name: string } | null;
  }>;
  available: ModelOption[];
};

async function fetchUserModels(): Promise<UserModelsResponse> {
  const res = await fetch('/api/user/models');
  if (!res.ok) throw new Error('Failed to load model selection');
  return res.json();
}

async function putUserModels(slot1: string | null, slot2: string | null, slot3: string | null) {
  const res = await fetch('/api/user/models', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slot1, slot2, slot3 }),
  });
  if (!res.ok) throw new Error('Failed to save model selection');
  return res.json();
}

async function createConversation(): Promise<{ id: string }> {
  const res = await fetch('/api/conversations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: null }),
  });
  if (!res.ok) throw new Error('Failed to create conversation');
  return res.json();
}

async function saveTurn(
  convId: string,
  turnId: string,
  userMessage: string,
  results: { openai: string; anthropic: string; google: string }
) {
  const res = await fetch(`/api/conversations/${convId}/turns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      turn_id: turnId,
      user_message: userMessage,
      openai_response: results.openai,
      anthropic_response: results.anthropic,
      google_response: results.google,
    }),
  });
  if (!res.ok) throw new Error('Failed to save turn');
  return res.json();
}

export default function ChatView({
  conversationId,
  initialTurns,
  userEmail: _userEmail,
  models: initialModels,
}: Props) {
  const queryClient = useQueryClient();
  const [convId, setConvId] = useState<string | null>(conversationId);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Live model selection state. Server-rendered `initialModels` is the SSR
  // fallback; the query refetches the canonical truth (with full pricing
  // catalog) from /api/user/models on mount and on any picker change.
  const userModelsQuery = useQuery({
    queryKey: ['user-models'],
    queryFn: fetchUserModels,
    staleTime: 60_000,
  });

  const activeModels: ModelEntry[] = useMemo(() => {
    if (userModelsQuery.data) {
      return userModelsQuery.data.slots.map((s) => ({
        key: s.slot,
        modelId: s.modelId,
        displayName: s.meta?.name ?? s.modelId,
      }));
    }
    return initialModels;
  }, [userModelsQuery.data, initialModels]);

  const { turns, isStreaming, sendMessage, setTurns } = useMultiChat();

  const createConvMutation = useMutation({
    mutationFn: createConversation,
    onSuccess: (data) => {
      setConvId(data.id);
      window.history.replaceState(null, '', `/chat/${data.id}`);
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });

  const saveTurnMutation = useMutation({
    mutationFn: ({
      convId,
      turnId,
      userMessage,
      results,
    }: {
      convId: string;
      turnId: string;
      userMessage: string;
      results: { openai: string; anthropic: string; google: string };
    }) => saveTurn(convId, turnId, userMessage, results),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['credit-balance'] });
    },
  });

  const slotPickMutation = useMutation({
    mutationFn: async ({ slot, next }: { slot: ProviderKey; next: string | null }) => {
      const data = userModelsQuery.data;
      if (!data) throw new Error('Selection not loaded yet');
      const slot1 = slot === 'openai' ? next : pickKeyOrNull(data, 'slot1');
      const slot2 = slot === 'anthropic' ? next : pickKeyOrNull(data, 'slot2');
      const slot3 = slot === 'google' ? next : pickKeyOrNull(data, 'slot3');
      return putUserModels(slot1, slot2, slot3);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-models'] });
    },
  });

  useEffect(() => {
    if (initialTurns) setTurns(initialTurns);
  }, [initialTurns, setTurns]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns]);

  async function ensureConversation(): Promise<string> {
    if (convId) return convId;
    const data = await createConvMutation.mutateAsync();
    return data.id;
  }

  async function handleSend() {
    const msg = input.trim();
    if (!msg || isStreaming) return;
    setInput('');

    const slotModels = {
      openai: activeModels.find((m) => m.key === 'openai')?.modelId ?? '',
      anthropic: activeModels.find((m) => m.key === 'anthropic')?.modelId ?? '',
      google: activeModels.find((m) => m.key === 'google')?.modelId ?? '',
    };

    const cid = await ensureConversation();
    await sendMessage(msg, slotModels, ({ turnId, results }) => {
      saveTurnMutation.mutate({ convId: cid, turnId, userMessage: msg, results });
    });
  }

  const renderPicker = useCallback(
    (slot: ProviderKey) => {
      const data = userModelsQuery.data;
      if (!data) return null;
      const slotEntry = data.slots.find((s) => s.slot === slot);
      if (!slotEntry) return null;
      return (
        <ModelPicker
          slot={slot}
          currentModelId={slotEntry.modelId}
          defaultModelId={slotEntry.defaultModelId}
          isOverridden={!slotEntry.isDefault}
          options={data.available}
          onPick={async (next) => {
            await slotPickMutation.mutateAsync({ slot, next });
          }}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userModelsQuery.data]
  );

  const isEmpty = turns.length === 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <EmptyState onPick={(s) => setInput(s)} models={activeModels} />
        ) : (
          <div className="divide-y divide-[rgba(0,0,0,0.06)]">
            {turns.map((turn) => (
              <TurnItem
                key={turn.id}
                turn={turn}
                models={activeModels}
                renderPicker={renderPicker}
              />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={handleSend}
        isStreaming={isStreaming}
      />
    </div>
  );
}

function pickKeyOrNull(
  data: UserModelsResponse,
  slotKey: 'slot1' | 'slot2' | 'slot3'
): string | null {
  // Use the user's existing override if any. isDefault===true means they
  // are currently on the provider default → keep it null in storage.
  const slot = data.slots.find((s) => s.slotKey === slotKey);
  if (!slot) return null;
  return slot.isDefault ? null : slot.modelId;
}

// Re-export to keep the slot mapping discoverable from this file as the
// canonical mapping (used by future refactors).
export { SLOT_INDEX };
