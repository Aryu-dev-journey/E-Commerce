const mongoose = require("mongoose");

// Instead of hardcoding
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const OrderSchema = new mongoose.Schema(
  {
    userId: String,
    amount: Number,
    items: [
      {
        id: String,
        title: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],
    razorpay_order_id: String,
    razorpay_payment_id: String,
    status: {
      type: String,
      enum: ["created", "paid", "failed", "refunded"],
      default: "created",
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Order", OrderSchema);
