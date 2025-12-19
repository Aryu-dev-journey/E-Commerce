import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  email: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Subscriber", subscriberSchema);
