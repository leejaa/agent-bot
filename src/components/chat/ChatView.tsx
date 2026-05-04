'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ModelColumn from './ModelColumn';
import { useMultiChat, Turn } from './useChat';

type Props = {
  conversationId: string | null;
  initialTurns?: Turn[];
  userEmail: string;
};

const MODELS = [
  { key: 'openai' as const, name: 'GPT-4o', modelId: 'openai/gpt-4o' },
  { key: 'anthropic' as const, name: 'Claude', modelId: 'anthropic/claude-sonnet-4.6' },
  { key: 'google' as const, name: 'Gemini', modelId: 'google/gemini-2.5-pro' },
];

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const msg = input.trim();
    if (!msg || isStreaming) return;
    setInput('');

    const cid = await ensureConversation();

    await sendMessage(msg, async (results) => {
      saveTurnMutation.mutate({ convId: cid, userMessage: msg, results });
    });
  }

  return (
    <div className="flex flex-col h-full">
      {/* Turn list */}
      <div className="flex-1 overflow-y-auto">
        {turns.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-zinc-500 text-sm">세 가지 AI에게 동시에 질문해보세요</p>
              <p className="text-zinc-600 text-xs mt-1">GPT-4o · Claude Sonnet · Gemini 2.5 Pro</p>
            </div>
          </div>
        )}

        {turns.map((turn) => (
          <div key={turn.id} className="border-b border-zinc-800">
            <div className="px-4 py-3 bg-zinc-900">
              <span className="text-xs font-medium text-zinc-500 mr-2">You</span>
              <span className="text-sm text-zinc-200">{turn.userMessage}</span>
            </div>

            <div className="grid grid-cols-3 divide-x divide-zinc-800 min-h-[120px]">
              {MODELS.map((m) => (
                <ModelColumn
                  key={m.key}
                  name={m.name}
                  modelId={m.modelId}
                  text={turn[m.key].text}
                  streaming={turn[m.key].streaming}
                  error={turn[m.key].error}
                />
              ))}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as FormEvent);
              }
            }}
            disabled={isStreaming}
            rows={1}
            placeholder="메시지를 입력하세요 (Shift+Enter로 줄바꿈)"
            className="flex-1 resize-none bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 max-h-40 overflow-y-auto"
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = 'auto';
              el.style.height = `${el.scrollHeight}px`;
            }}
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-colors shrink-0"
          >
            {isStreaming ? (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                응답 중
              </span>
            ) : (
              '전송'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
