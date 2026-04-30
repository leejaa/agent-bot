import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from './lib/session';

const PUBLIC_PATHS = ['/login', '/register', '/api/auth/login', '/api/auth/register'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = request.cookies.get('session')?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  response.headers.set('x-user-id', session.userId);
  response.headers.set('x-user-email', session.email);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)'],
};
