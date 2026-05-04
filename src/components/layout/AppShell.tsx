'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import MobileHeader from './MobileHeader';

type Conversation = {
  id: string;
  title: string | null;
  updatedAt: string | null;
};

type Props = {
  initialConversations: Conversation[];
  userEmail: string;
  children: React.ReactNode;
};

export default function AppShell({ initialConversations, userEmail, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);

  return (
    <div className="flex h-[100svh] bg-ghost-white text-deep-graphite">
      <Sidebar
        initialConversations={initialConversations}
        userEmail={userEmail}
        mobileOpen={mobileOpen}
        onMobileClose={close}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileHeader onMenuToggle={() => setMobileOpen(true)} />
        <main className="flex-1 min-h-0 flex flex-col">{children}</main>
      </div>
    </div>
  );
}
