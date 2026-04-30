import { cookies } from 'next/headers';
import crypto from 'crypto';
import { sql } from './db';
import {
  COOKIE_NAME,
  SESSION_DURATION_SECS,
  SessionPayload,
  createSessionToken,
  verifySessionToken,
} from './session';

export type { SessionPayload };

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION_SECS,
    path: '/',
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function createSession(payload: SessionPayload): Promise<string> {
  return createSessionToken(payload);
}

export async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(password, salt, 64, (err, key) => {
      if (err) reject(err);
      else resolve(`${salt}:${key.toString('hex')}`);
    });
  });
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, storedKey] = hash.split(':');
    crypto.scrypt(password, salt, 64, (err, key) => {
      if (err) reject(err);
      else resolve(key.toString('hex') === storedKey);
    });
  });
}

export type User = {
  id: string;
  email: string;
  password_hash: string;
  created_at: Date;
};

export async function getUserByEmail(email: string): Promise<User | null> {
  const db = sql();
  const rows = await db`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
  return (rows[0] as User) ?? null;
}

export async function createUser(email: string, passwordHash: string): Promise<User> {
  const db = sql();
  const rows = await db`
    INSERT INTO users (email, password_hash)
    VALUES (${email}, ${passwordHash})
    RETURNING *
  `;
  return rows[0] as User;
}
