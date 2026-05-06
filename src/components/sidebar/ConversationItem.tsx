'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/navigation';

type Props = {
  conversation: { id: string; title: string | null };
  onNav?: () => void;
};

async function deleteConversation(id: string): Promise<void> {
  const res = await fetch(`/api/conversations/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete conversation');
}

export default function ConversationItem({ conversation, onNav }: Props) {
  const t = useTranslations('Sidebar');
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const active = pathname === `/chat/${conversation.id}`;

  const deleteMutation = useMutation({
    mutationFn: () => deleteConversation(conversation.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      if (active) router.push('/chat');
      onNav?.();
    },
  });

  function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(t('deleteConfirm'))) return;
    deleteMutation.mutate();
  }

  return (
    <div
      className={`group relative flex items-center rounded-[var(--radius-button)] transition-colors ${
        active ? 'bg-ghost-white' : 'hover:bg-ghost-white'
      }`}
    >
      <Link
        href={`/chat/${conversation.id}`}
        onClick={onNav}
        className={`flex-1 min-w-0 truncate pl-3 pr-1 py-2.5 lg:py-1.5 ${
          active ? 'text-deep-graphite' : 'text-deep-slate group-hover:text-deep-graphite'
        }`}
        style={{
          fontSize: 'var(--text-body-sm)',
          letterSpacing: 'var(--text-body-sm--letter-spacing)',
        }}
      >
        {conversation.title ?? t('newChat')}
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleteMutation.isPending}
        aria-label={t('delete')}
        className="shrink-0 mr-1 w-7 h-7 flex items-center justify-center rounded-[var(--radius-button)] text-cool-gray hover:text-alert-red hover:bg-[rgba(247,116,99,0.08)] opacity-50 lg:opacity-0 group-hover:opacity-100 disabled:opacity-30 transition-all"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
        </svg>
      </button>
    </div>
  );
}
