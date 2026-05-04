import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { getBalance } from '@/db/queries/credits';

export const runtime = 'nodejs';

export async function GET() {
  const headersList = await headers();
  const userId = headersList.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const balance = await getBalance(userId);
  return NextResponse.json({ balance });
}
