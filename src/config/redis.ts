import Redis from 'ioredis';

if (!process.env.REDIS_URL) {
  throw new Error('REDIS_URL environment variable is required');
}

const redisUrl = process.env.REDIS_URL;

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: Number(process.env.REDIS_MAX_RETRIES) || 3,
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redis.on('connect', () => {
  console.log('Redis connected');
});

