import { redis } from './redis';

const DAILY_LIMIT = parseInt(process.env.DAILY_MESSAGE_LIMIT ?? '50', 10);

function todayKey(userId: string): string {
  const d = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
  return `ratelimit:${userId}:${d}`;
}

export async function checkRateLimit(userId: string): Promise<{ allowed: boolean; remaining: number; limit: number }> {
  const key = todayKey(userId);
  const count = await redis.incr(key);

  // Set expiry on first increment (86400s = 24h)
  if (count === 1) {
    await redis.expire(key, 86400);
  }

  const remaining = Math.max(0, DAILY_LIMIT - count);
  return { allowed: count <= DAILY_LIMIT, remaining, limit: DAILY_LIMIT };
}

export async function getRateLimitStatus(userId: string): Promise<{ used: number; remaining: number; limit: number }> {
  const key = todayKey(userId);
  const raw = await redis.get<number>(key);
  const used = raw ?? 0;
  return { used, remaining: Math.max(0, DAILY_LIMIT - used), limit: DAILY_LIMIT };
}
