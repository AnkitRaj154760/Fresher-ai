import dotenv from "dotenv"
dotenv.config()
import Razorpay from "razorpay"

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
    console.error("⚠️ RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing in billing environment!");
}

const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret
})

export default razorpay