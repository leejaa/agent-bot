import { SignJWT, jwtVerify } from 'jose';

export const COOKIE_NAME = 'session';
export const SESSION_DURATION_SECS = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not set');
  return new TextEncoder().encode(secret);
}

export type SessionPayload = {
  userId: string;
  email: string;
};

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECS}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}
