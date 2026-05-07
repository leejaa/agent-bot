import { auth } from '@/lib/auth';
import { redirect } from '@/i18n/navigation';
import { listConversationsForUser } from '@/db/queries/conversations';
import { resolveActiveModels } from '@/db/queries/userModelSelection';
import AppShell from '@/components/layout/AppShell';
import ChatView from '@/components/chat/ChatView';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ChatPage({ params }: Props) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    redirect({ href: '/sign-in', locale: locale as 'en' | 'ko' });
    return null;
  }

  const [conversations, models] = await Promise.all([
    listConversationsForUser(session.user.id),
    resolveActiveModels(session.user.id),
  ]);

  return (
    <AppShell
      initialConversations={conversations}
      userEmail={session.user.email ?? ''}
    >
      <ChatView
        conversationId={null}
        userEmail={session.user.email ?? ''}
        models={models}
      />
    </AppShell>
  );
}
