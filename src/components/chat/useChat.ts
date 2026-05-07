'use client';

import { useState, useCallback } from 'react';

export type ModelMessage = { role: 'user' | 'assistant'; content: string };

export type Turn = {
  id: string; // client-side temp id, doubles as the server-side turnId for usage cache
  userMessage: string;
  openai: { text: string; streaming: boolean; error?: string };
  anthropic: { text: string; streaming: boolean; error?: string };
  google: { text: string; streaming: boolean; error?: string };
};

type Provider = 'openai' | 'anthropic' | 'google';

const ENDPOINTS: Record<Provider, string> = {
  openai: '/api/chat/openai',
  anthropic: '/api/chat/anthropic',
  google: '/api/chat/google',
};

type StreamRequestBody = {
  messages: ModelMessage[];
  modelId: string;
  turnId: string;
};

async function streamProvider(
  endpoint: string,
  body: StreamRequestBody,
  onChunk: (text: string) => void,
  onError: (err: string) => void,
  onDone: (full: string) => void
) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      onError(data.error ?? `오류 (${res.status})`);
      return '';
    }

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    let full = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      full += chunk;
      onChunk(full);
    }

    onDone(full);
    return full;
  } catch (err) {
    const msg = err instanceof Error ? err.message : '알 수 없는 오류';
    onError(msg);
    return '';
  }
}

type SlotModelMap = Record<Provider, string>;

type SaveCallbackArg = {
  turnId: string;
  results: Record<Provider, string>;
};

export function useMultiChat(conversationId: string | null) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  function buildHistory(provider: Provider, upToIndex: number): ModelMessage[] {
    const msgs: ModelMessage[] = [];
    for (let i = 0; i < upToIndex; i++) {
      const t = turns[i];
      msgs.push({ role: 'user', content: t.userMessage });
      const resp = t[provider].text;
      if (resp) msgs.push({ role: 'assistant', content: resp });
    }
    return msgs;
  }

  const sendMessage = useCallback(
    async (
      userMessage: string,
      slotModels: SlotModelMap,
      onSaved?: (arg: SaveCallbackArg) => void
    ) => {
      if (isStreaming || !userMessage.trim()) return;
      setIsStreaming(true);

      const turnIndex = turns.length;
      const turnId = crypto.randomUUID();

      setTurns((prev) => [
        ...prev,
        {
          id: turnId,
          userMessage,
          openai: { text: '', streaming: true },
          anthropic: { text: '', streaming: true },
          google: { text: '', streaming: true },
        },
      ]);

      const results: Record<Provider, string> = { openai: '', anthropic: '', google: '' };

      const providerPromises = (['openai', 'anthropic', 'google'] as Provider[]).map((provider) => {
        const history = buildHistory(provider, turnIndex);
        const messages: ModelMessage[] = [...history, { role: 'user', content: userMessage }];

        return streamProvider(
          ENDPOINTS[provider],
          { messages, modelId: slotModels[provider], turnId },
          (full) => {
            setTurns((prev) =>
              prev.map((t) =>
                t.id === turnId ? { ...t, [provider]: { text: full, streaming: true } } : t
              )
            );
          },
          (err) => {
            setTurns((prev) =>
              prev.map((t) =>
                t.id === turnId ? { ...t, [provider]: { text: '', streaming: false, error: err } } : t
              )
            );
          },
          (full) => {
            results[provider] = full;
            setTurns((prev) =>
              prev.map((t) =>
                t.id === turnId ? { ...t, [provider]: { text: full, streaming: false } } : t
              )
            );
          }
        );
      });

      await Promise.all(providerPromises);
      setIsStreaming(false);

      if (conversationId && onSaved) {
        onSaved({ turnId, results });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [turns, isStreaming, conversationId]
  );

  return { turns, isStreaming, sendMessage, setTurns };
}
