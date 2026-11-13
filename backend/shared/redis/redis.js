import Redis from "ioredis"
import dotenv from "dotenv"
import { resolve } from "path"

// Each service has its own .env. Since ESM imports are hoisted before
// any code runs, dotenv.config() in index.js fires too late for this
// shared module. Load the .env from the service's working directory here.
dotenv.config({ path: resolve(process.cwd(), ".env") });

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