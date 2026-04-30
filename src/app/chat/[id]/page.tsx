import { redirect, notFound } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { sql } from '@/lib/db';
import Sidebar from '@/components/sidebar/Sidebar';
import ChatView from '@/components/chat/ChatView';
import { Turn } from '@/components/chat/useChat';

type PageProps = { params: Promise<{ id: string }> };

export default async function ConversationPage({ params }: PageProps) {
  const session = await getSession();
  if (!session) redirect('/login');

  const { id } = await params;
  const db = sql();

  const [convRows, turns, conversations] = await Promise.all([
    db`SELECT * FROM conversations WHERE id = ${id} AND user_id = ${session.userId} LIMIT 1`,
    db`SELECT * FROM turns WHERE conversation_id = ${id} ORDER BY created_at ASC`,
    db`SELECT id, title, updated_at FROM conversations WHERE user_id = ${session.userId} ORDER BY updated_at DESC LIMIT 50`,
  ]);

  if (!convRows[0]) notFound();

  const initialTurns: Turn[] = (turns as any[]).map((t) => ({
    id: t.id,
    userMessage: t.user_message,
    openai: { text: t.openai_response ?? '', streaming: false },
    anthropic: { text: t.anthropic_response ?? '', streaming: false },
    google: { text: t.google_response ?? '', streaming: false },
  }));

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <Sidebar
        initialConversations={conversations as any[]}
        userEmail={session.email}
      />
      <main className="flex-1 min-w-0 flex flex-col">
        <ChatView
          conversationId={id}
          initialTurns={initialTurns}
          userEmail={session.email}
        />
      </main>
    </div>
  );
}
