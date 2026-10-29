import Redis from "ioredis"

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    console.warn("⚠️ REDIS_URL environment variable is not defined!");
}

// Upstash uses rediss:// (TLS). ioredis needs explicit tls option for it.
const redis = new Redis(redisUrl, {
    tls: redisUrl?.startsWith("rediss://") ? {} : undefined,
    maxRetriesPerRequest: 3,
});

redis.on("connect", () => {
    console.log("Redis connected successfully");
});

redis.on("error", (err) => {
    console.error("Redis connection error:", err.message || err);
});

export default redis