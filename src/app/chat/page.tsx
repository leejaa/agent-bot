import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { listConversationsForUser } from '@/db/queries/conversations';
import AppShell from '@/components/layout/AppShell';
import ChatView from '@/components/chat/ChatView';

export default async function ChatPage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/sign-in');

  const conversations = await listConversationsForUser(session.user.id);

  return (
    <AppShell
      initialConversations={conversations}
      userEmail={session.user.email ?? ''}
    >
      <ChatView conversationId={null} userEmail={session.user.email ?? ''} />
    </AppShell>
  );
}
