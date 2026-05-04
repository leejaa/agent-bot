import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { listConversationsForUser } from '@/db/queries/conversations';
import Sidebar from '@/components/sidebar/Sidebar';
import ChatView from '@/components/chat/ChatView';

export default async function ChatPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/sign-in');

  const conversations = await listConversationsForUser(session.user.id);

  return (
    <div className="flex h-screen bg-ghost-white text-deep-graphite">
      <Sidebar
        initialConversations={conversations}
        userEmail={session.user.email ?? ''}
      />
      <main className="flex-1 min-w-0 flex flex-col">
        <ChatView conversationId={null} userEmail={session.user.email ?? ''} />
      </main>
    </div>
  );
}
