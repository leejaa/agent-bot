'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EmptyState from './EmptyState';
import TurnItem from './TurnItem';
import ChatInput from './ChatInput';
import { useMultiChat, Turn } from './useChat';

type Props = {
  conversationId: string | null;
  initialTurns?: Turn[];
  userEmail: string;
};

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
  userMessage: string,
  results: { openai: string; anthropic: string; google: string }
) {
  const res = await fetch(`/api/conversations/${convId}/turns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_message: userMessage,
      openai_response: results.openai,
      anthropic_response: results.anthropic,
      google_response: results.google,
    }),
  });
  if (!res.ok) throw new Error('Failed to save turn');
  return res.json();
}

export default function ChatView({ conversationId, initialTurns, userEmail: _userEmail }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [convId, setConvId] = useState<string | null>(conversationId);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const { turns, isStreaming, sendMessage, setTurns } = useMultiChat(convId);

  const createConvMutation = useMutation({
    mutationFn: createConversation,
    onSuccess: (data) => {
      setConvId(data.id);
      router.push(`/chat/${data.id}`);
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });

  const saveTurnMutation = useMutation({
    mutationFn: ({
      convId,
      userMessage,
      results,
    }: {
      convId: string;
      userMessage: string;
      results: { openai: string; anthropic: string; google: string };
    }) => saveTurn(convId, userMessage, results),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
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

    const cid = await ensureConversation();
    await sendMessage(msg, async (results) => {
      saveTurnMutation.mutate({ convId: cid, userMessage: msg, results });
    });
  }

  const isEmpty = turns.length === 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <EmptyState onPick={(s) => setInput(s)} />
        ) : (
          <div className="divide-y divide-[rgba(0,0,0,0.06)]">
            {turns.map((turn) => (
              <TurnItem key={turn.id} turn={turn} />
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
