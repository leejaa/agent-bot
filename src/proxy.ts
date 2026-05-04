import { NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { auth } from './lib/auth';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

// Locale-aware regex helpers
const LOCALE_RE = /^\/(en|ko)(?=\/|$)/;

function stripLocale(pathname: string): string {
  return pathname.replace(LOCALE_RE, '') || '/';
}

function localePrefix(pathname: string): string {
  const m = pathname.match(LOCALE_RE);
  return m ? `/${m[1]}` : '';
}

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // 1. Auth.js callback routes — fully public, no rewriting
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // 2. Other API routes — auth check + forward x-user-id, no locale
  if (pathname.startsWith('/api/')) {
    if (!req.auth) {
      return new Response('Unauthorized', { status: 401 });
    }
    const requestHeaders = new Headers(req.headers);
    if (req.auth.user?.id) requestHeaders.set('x-user-id', req.auth.user.id);
    if (req.auth.user?.email) requestHeaders.set('x-user-email', req.auth.user.email);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // 3. User-facing pages: locale handling first
  const intlResponse = intlMiddleware(req);

  // Public locale-aware paths: /, /sign-in (with optional /en or /ko prefix)
  const stripped = stripLocale(pathname);
  const isPublic = stripped === '/' || stripped === '/sign-in';

  if (isPublic) {
    return intlResponse;
  }

  // Protected pages — require auth
  if (!req.auth) {
    const prefix = localePrefix(pathname);
    const signInUrl = new URL(`${prefix}/sign-in`, req.nextUrl);
    signInUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return intlResponse;
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)'],
};
