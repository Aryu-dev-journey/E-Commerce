const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  items: [
    {
      id: String,
      title: String,
      price: Number,
      qty: Number,
      image: String
    }
  ],
  razorpay_order_id: String,
  razorpay_payment_id: String,
  status: { type: String, default: "created" }
});

module.exports = mongoose.model("Order", OrderSchema);
