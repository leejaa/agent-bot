import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { listConversationsForUser } from '@/db/queries/conversations';
import Sidebar from '@/components/sidebar/Sidebar';
import ChatView from '@/components/chat/ChatView';

export default async function ChatPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const conversations = await listConversationsForUser(session.userId);

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <Sidebar
        initialConversations={conversations}
        userEmail={session.email}
      />
      <main className="flex-1 min-w-0 flex flex-col">
        <ChatView conversationId={null} userEmail={session.email} />
      </main>
    </div>
  );
}
