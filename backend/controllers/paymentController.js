import crypto from "crypto";
import Order from "../models/Order.js";

export const verifyPayment = async (req, res) => {
  try {

    console.log("🔥 VERIFY ROUTE HIT");
    console.log("BODY:", req.body);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
      shipping,
      total,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log("EXPECTED:", expectedSignature);
    console.log("RECEIVED:", razorpay_signature);

    if (expectedSignature === razorpay_signature) {

      console.log("✅ SIGNATURE MATCHED");

      const order = await Order.create({
        cartItems,
        shipping,
        total,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        paymentStatus: "Paid",
      });

      console.log("🎉 Order saved:", order._id);

      res.json({ success: true });

    } else {
      console.log("❌ SIGNATURE FAILED");
      res.json({ success: false });
    }

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({ success: false });
  }
};