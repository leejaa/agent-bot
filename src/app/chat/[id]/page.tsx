import { redirect, notFound } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getConversationById, listConversationsForUser } from '@/db/queries/conversations';
import { listTurnsByConversation } from '@/db/queries/turns';
import Sidebar from '@/components/sidebar/Sidebar';
import ChatView from '@/components/chat/ChatView';
import { Turn } from '@/components/chat/useChat';

type PageProps = { params: Promise<{ id: string }> };

export default async function ConversationPage({ params }: PageProps) {
  const session = await getSession();
  if (!session) redirect('/login');

  const { id } = await params;

  const [conversation, turns, conversations] = await Promise.all([
    getConversationById(id, session.userId),
    listTurnsByConversation(id),
    listConversationsForUser(session.userId),
  ]);

  if (!conversation) notFound();

  const initialTurns: Turn[] = turns.map((t) => ({
    id: t.id,
    userMessage: t.userMessage,
    openai: { text: t.openaiResponse ?? '', streaming: false },
    anthropic: { text: t.anthropicResponse ?? '', streaming: false },
    google: { text: t.googleResponse ?? '', streaming: false },
  }));

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <Sidebar
        initialConversations={conversations}
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
