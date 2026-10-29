import Redis from "ioredis"

const redisUrl = process.env.REDIS_URL;

// Upstash uses rediss:// (TLS). ioredis needs explicit tls option for it.
const redis = new Redis(redisUrl, {
    tls: redisUrl?.startsWith("rediss://") ? {} : undefined,
    maxRetriesPerRequest: 3,
});

redis.on("connect", () => {
    console.log("Redis connected");
});

redis.on("error", (err) => {
    console.error("Redis connection error:", err.message);
});

export default redis