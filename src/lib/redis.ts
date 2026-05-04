import Redis from 'ioredis';

declare global {
  var __redis: Redis | undefined;
}

if (!process.env.REDIS_URL) {
  throw new Error('REDIS_URL is not set');
}

export const redis: Redis =
  globalThis.__redis ??
  (globalThis.__redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: false,
  }));
