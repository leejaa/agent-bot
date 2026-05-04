import type { Metadata } from 'next';
import { Jua } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/components/providers/QueryProvider';

const jua = Jua({
  variable: '--font-jua',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Agent Bot — 3 AI 동시 비교',
  description: 'GPT-4o, Claude Sonnet, Gemini 2.5 Pro를 동시에 비교해보세요',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={jua.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="bg-ghost-white text-deep-graphite antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
