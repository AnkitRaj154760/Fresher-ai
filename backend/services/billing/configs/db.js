import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";

export const connectDB=async () => {
    try {
        const uri = process.env.MONGODB_URL || process.env.MONGO_URI;
        if (!uri) {
            console.error("⚠️ MONGODB_URL or MONGO_URI is not defined in billing service environment!");
            return;
        }
        await mongoose.connect(uri)
        console.log("Connected DB")
    } catch (error) {
        console.log("MongoDb error",error)
    }
}