import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserByEmail, verifyPassword, createSession, setSessionCookie } from '@/lib/auth';

const schema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: '이메일과 비밀번호를 입력하세요.' }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const user = await getUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return NextResponse.json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' }, { status: 401 });
  }

  const token = await createSession({ userId: user.id, email: user.email });
  await setSessionCookie(token);

  return NextResponse.json({ ok: true });
}
