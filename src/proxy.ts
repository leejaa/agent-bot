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

  // 1. Auth.js callbacks + external webhooks — fully public, no rewriting
  if (pathname.startsWith('/api/auth') || pathname.startsWith('/api/webhooks/')) {
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

  // Public locale-aware paths: /, /sign-in, /blog/*, /compare/*, /alternatives/*
  // (with optional /en or /ko prefix)
  const stripped = stripLocale(pathname);
  const isLandingOrSignIn = stripped === '/' || stripped === '/sign-in';
  const isBlog = stripped === '/blog' || stripped.startsWith('/blog/');
  const isCompare = stripped === '/compare' || stripped.startsWith('/compare/');
  const isAlternatives =
    stripped === '/alternatives' || stripped.startsWith('/alternatives/');
  const isPublic = isLandingOrSignIn || isBlog || isCompare || isAlternatives;

  if (isPublic) {
    // Logged-in users on the landing/sign-in pages get bounced to /chat.
    // Blog pages stay readable to everyone — including logged-in users.
    if (req.auth && isLandingOrSignIn) {
      const prefix = localePrefix(pathname);
      return NextResponse.redirect(new URL(`${prefix}/chat`, req.nextUrl));
    }
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
  matcher: [
    // Skip Next.js internals, well-known SEO files, OG/Twitter images, and any
    // request with a static-asset-style file extension. The remaining paths
    // are user-facing pages and API routes that need auth + i18n handling.
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|opengraph-image|twitter-image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|woff|woff2|ttf)).*)',
  ],
};
