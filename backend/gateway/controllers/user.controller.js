
import redis from "../../shared/redis/redis.js";

export const getCurrentUser = async (req, res) => {
    try {
        const sessionId = req.cookies?.session;
        if (!sessionId) {
            return res.status(200).json({ success: true, user: null });
        }

        const session = await redis.get(`session:${sessionId}`);
        if (!session) {
            return res.status(200).json({ success: true, user: null });
        }

        const user = JSON.parse(session);
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("getCurrentUser error:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};