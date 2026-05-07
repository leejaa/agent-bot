import { notFound } from 'next/navigation';
import { auth } from '@/lib/auth';
import { redirect } from '@/i18n/navigation';
import { getConversationById, listConversationsForUser } from '@/db/queries/conversations';
import { listTurnsByConversation } from '@/db/queries/turns';
import { resolveActiveModels } from '@/db/queries/userModelSelection';
import AppShell from '@/components/layout/AppShell';
import ChatView from '@/components/chat/ChatView';
import { Turn } from '@/components/chat/useChat';

type PageProps = { params: Promise<{ id: string; locale: string }> };

export default async function ConversationPage({ params }: PageProps) {
  const { id, locale } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    redirect({ href: '/sign-in', locale: locale as 'en' | 'ko' });
    return null;
  }

  const [conversation, turns, conversations, models] = await Promise.all([
    getConversationById(id, session.user.id),
    listTurnsByConversation(id),
    listConversationsForUser(session.user.id),
    resolveActiveModels(session.user.id),
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
    <AppShell
      initialConversations={conversations}
      userEmail={session.user.email ?? ''}
    >
      <ChatView
        conversationId={id}
        initialTurns={initialTurns}
        userEmail={session.user.email ?? ''}
        models={models}
      />
    </AppShell>
  );
}
