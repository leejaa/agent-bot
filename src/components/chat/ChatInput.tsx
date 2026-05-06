'use client';

import { useTranslations } from 'next-intl';
import ChatInputView from './ChatInputView';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  isStreaming?: boolean;
};

export default function ChatInput(props: Props) {
  const t = useTranslations('Chat');
  return (
    <ChatInputView
      {...props}
      placeholder={t('placeholder')}
      sendAriaLabel={t('sendAria')}
    />
  );
}
