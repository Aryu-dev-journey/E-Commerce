const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto"); // For signature verification if needed
const Order = require("../model/orders"); // Your Order model

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Add these in .env
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a Razorpay order
router.post("/create-order", async (req, res) => {
  const { amount, userId, cartItems } = req.body;

  try {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const newOrder = new Order({
      userId,
      amount,
      items: cartItems, // <-- store cart items
      razorpay_order_id: order.id,
      status: "created",
    });

    await newOrder.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Optional: Verify payment (called after successful payment)
router.post("/verify-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // Verify signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Update order status in MongoDB
    await Order.findOneAndUpdate(
      { razorpay_order_id },
      { status: "paid", razorpay_payment_id }
    );
    res.status(200).json({ status: "Payment verified successfully" });
  } else {
    res.status(400).json({ status: "Payment verification failed" });
  }
});

module.exports = router;
