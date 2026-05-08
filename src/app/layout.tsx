import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import QueryProvider from '@/components/providers/QueryProvider';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

// Pretendard Variable served from /public/fonts so the browser can
// preload it from the same origin — no extra DNS / TCP / TLS handshake
// to a third-party CDN, no render-blocking external <link>. Acts as the
// Korean fallback when Geist (Latin-only) hits a non-Latin glyph.
const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${pretendard.variable}`}
    >
      <body className="bg-ghost-white text-deep-graphite antialiased">
        <QueryProvider>{children}</QueryProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
