import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

const PUBLIC_PATHS = ['/sign-in', '/api/auth'];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  if (!req.auth) {
    const signInUrl = new URL('/sign-in', req.nextUrl);
    signInUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Forward auth info to downstream route handlers via REQUEST headers
  // (response.headers.set() would only reach the browser, not the route).
  const requestHeaders = new Headers(req.headers);
  if (req.auth.user?.id) requestHeaders.set('x-user-id', req.auth.user.id);
  if (req.auth.user?.email) requestHeaders.set('x-user-email', req.auth.user.email);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)'],
};
