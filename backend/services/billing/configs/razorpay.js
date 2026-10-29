import dotenv from "dotenv"
dotenv.config()
import Razorpay from "razorpay"

const sanitize = (val) => val ? val.trim().replace(/^["']|["']$/g, "") : "";

const keyId = sanitize(process.env.RAZORPAY_KEY_ID) || "rzp_test_To2kKq3ZF7nT3K";
const keySecret = sanitize(process.env.RAZORPAY_KEY_SECRET) || "IDr5Rt2rGjGdy7KEUgk1ir08";

const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret
})

export default razorpay