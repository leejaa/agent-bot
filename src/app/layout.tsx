import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/components/providers/QueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Agent Bot — 3 AI 동시 비교',
  description: 'GPT-4o, Claude Sonnet, Gemini 2.5 Pro를 동시에 비교해보세요',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-zinc-900 text-white antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
