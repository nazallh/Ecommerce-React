const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const Order = require("../models/Order");

const router = express.Router();

/* Razorpay Instance */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

/* CREATE ORDER */
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Razorpay order creation failed",
    });
  }
});

/* VERIFY PAYMENT + SAVE ORDER */
router.post("/verify-payment", async (req, res) => {
  try {
    console.log("VERIFY BODY:", req.body); // DEBUG

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
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    /* SAVE ORDER */
    const newOrder = new Order({
      items: cartItems,
      shipping,
      totalAmount: total,
      paymentMethod: "razorpay",
      paymentStatus: "Paid",
      transactionId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      orderStatus: "Processing",
    });

    await newOrder.save();

    console.log("ORDER SAVED:", newOrder);

    res.json({
      success: true,
      message: "Payment verified & order saved",
      order: newOrder,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Payment verification failed",
    });
  }
});

/* COD ORDER */
router.post("/cod-order", async (req, res) => {
  try {
    const { cartItems, shipping, total } = req.body;

    const newOrder = new Order({
      items: cartItems,
      shipping,
      totalAmount: total,
      paymentMethod: "cod",
      paymentStatus: "Pending",
      orderStatus: "Processing",
    });

    await newOrder.save();

    res.json({
      success: true,
      message: "COD Order Placed Successfully",
      order: newOrder,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "COD order failed",
    });
  }
});

module.exports = router;