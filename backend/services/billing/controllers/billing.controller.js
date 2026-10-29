import razorpay from "../configs/razorpay.js";
import Billing from "../models/billing.model.js";
import crypto from "crypto"



const PLANS = {
    starter: {
        amount: 199,
        interviewCoins: 300,
    },
};

export const createOrder = async (req, res) => {
    try {
        const { planId } = req.body
        const userId = req.headers["x-user-id"]
        const plan = PLANS[planId]

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User ID is required",
            });
        }

        if (!plan) {
            return res.status(400).json({
                success: false,
                message: "Invalid plan",
            });
        }

        const order = await razorpay.orders.create({
            amount: plan.amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        })

        await Billing.create({
            userId,
            amount: plan.amount,
            interviewCoins: plan.interviewCoins,
            razorpayOrderId: order.id,
            status: "created",
        })

        return res.status(201).json({
            success: true,
            order,
        })

    } catch (error) {
        console.error("createOrder error:", error);
        return res.status(500).json({
            success: false,
            message: error?.error?.description || error.message || "Failed to create order",
            details: error?.error || error.message,
        });
    }
}

export const verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body

        const payment = await Billing.findOne({
            razorpayOrderId:razorpay_order_id
        })
        if(!payment){
             return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
        }

        const secret = (process.env.RAZORPAY_KEY_SECRET || "").trim().replace(/^["']|["']$/g, "") || "IDr5Rt2rGjGdy7KEUgk1ir08";
        const genSign = crypto.createHmac("sha256", secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex")

        if(genSign !== razorpay_signature){
            payment.status = "failed";
            await payment.save()
            return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
        }

        if (payment.status === "paid") {
      return res.status(200).json({
        success: true,
        message: "Payment already verified",
      });
    }

    payment.status = "paid"
    payment.razorpayPaymentId = razorpay_payment_id
    payment.razorpaySignature = razorpay_signature

    await payment.save()

    return res.status(200).json({
      success: true,
      message: "Payment successful",
    });
    } catch (error) {

        console.error("verifyPayment error:", error);

    if (req.body?.razorpay_order_id) {
      await Billing.findOneAndUpdate(
        {
          razorpayOrderId: req.body.razorpay_order_id,
        },
        {
          status: "failed",
        }
      );
    }

    return res.status(500).json({
      success: false,
      message: error?.error?.description || error.message || "Payment verification failed",
      details: error?.error || error.message,
    });

    }
}
