import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserByEmail, createUser, hashPassword, createSession, setSessionCookie } from '@/lib/auth';

const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: '이메일과 8자 이상의 비밀번호를 입력하세요.' }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const existing = await getUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: '이미 사용 중인 이메일입니다.' }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const user = await createUser(email, passwordHash);

  const token = await createSession({ userId: user.id, email: user.email });
  await setSessionCookie(token);

  return NextResponse.json({ ok: true });
}
