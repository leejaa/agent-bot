import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { sql } from '@/lib/db';
import Sidebar from '@/components/sidebar/Sidebar';
import ChatView from '@/components/chat/ChatView';

export default async function ChatPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const db = sql();
  const conversations = await db`
    SELECT id, title, updated_at
    FROM conversations
    WHERE user_id = ${session.userId}
    ORDER BY updated_at DESC
    LIMIT 50
  `;

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <Sidebar
        initialConversations={conversations as any[]}
        userEmail={session.email}
      />
      <main className="flex-1 min-w-0 flex flex-col">
        <ChatView conversationId={null} userEmail={session.email} />
      </main>
    </div>
  );
}
