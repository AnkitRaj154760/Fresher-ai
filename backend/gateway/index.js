import express from "express"
import dotenv from "dotenv"
dotenv.config()
import proxy from "express-http-proxy"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import { getCurrentUser } from "./controllers/user.controller.js"
import { isAuth } from "./middleware/isAuth.js"
import { proxyWithHeaders } from "./utils/proxyWithHeaders.js"
const app = express()
app.use(express.json())

const rawFrontendUrl = process.env.FRONTEND_URL || "";
const cleanFrontendUrl = rawFrontendUrl.trim().replace(/\/+$/, "");

const allowedOrigins = [
    cleanFrontendUrl,
    "https://fresher-ai-nine.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or server-to-server)
        if (!origin) return callback(null, true);
        const cleanOrigin = origin.trim().replace(/\/+$/, "");
        if (
            allowedOrigins.includes(cleanOrigin) ||
            cleanOrigin.endsWith(".vercel.app")
        ) {
            return callback(null, cleanOrigin);
        }
        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie", "x-user-id", "x-user-email"],
    exposedHeaders: ["Set-Cookie"]
}));

app.use(morgan("dev"))
app.use(cookieParser())

const PORT = process.env.PORT || 6000

app.get("/" , (req,res)=>{
    res.send("Hello from Gateway")
})


const AUTH_URL = process.env.AUTH_SERVICE_URL || "http://localhost:8001";
const RESUME_URL = process.env.RESUME_SERVICE_URL || "http://localhost:8002";
const INTERVIEW_URL = process.env.INTERVIEW_SERVICE_URL || "http://localhost:8003";
const ROADMAP_URL = process.env.ROADMAP_SERVICE_URL || "http://localhost:8004";
const BILLING_URL = process.env.BILLING_SERVICE_URL || "http://localhost:8005";

app.use("/api/auth", proxy(AUTH_URL, {
    proxyReqBodyDecorator: (bodyContent, srcReq) => {
        // express.json() already parsed the body; re-serialize it so the proxy
        // can forward it correctly to the auth service instead of sending an empty body.
        if (srcReq.body && Object.keys(srcReq.body).length > 0) {
            return JSON.stringify(srcReq.body);
        }
        return bodyContent;
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        // Always forward Cookie header so the auth service receives the session cookie
        if (srcReq.headers.cookie) {
            proxyReqOpts.headers["Cookie"] = srcReq.headers.cookie;
        }

        if (srcReq.body && Object.keys(srcReq.body).length > 0) {
            proxyReqOpts.headers["Content-Type"] = "application/json";
            proxyReqOpts.headers["Content-Length"] = Buffer.byteLength(JSON.stringify(srcReq.body));
        }
        return proxyReqOpts;
    }
}))
app.use("/api/resume" ,isAuth, proxyWithHeaders(RESUME_URL))
app.use("/api/interview",isAuth ,proxyWithHeaders(INTERVIEW_URL))
app.use("/api/roadmap",isAuth ,proxyWithHeaders(ROADMAP_URL))
app.use("/api/billing",isAuth ,proxyWithHeaders(BILLING_URL))
app.get("/api/me", getCurrentUser)





app.listen(PORT , ()=>{
    console.log(`Gateway Started on ${PORT}`)
})