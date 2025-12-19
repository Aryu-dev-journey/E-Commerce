import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

dotenv.config();

/* ============================
   DATABASE
============================ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/* ============================
   APP CONFIG
============================ */
const app = express();
const PORT = process.env.PORT || 10000;
const isProduction = process.env.NODE_ENV === "production";

/* ============================
   ENV VALIDATION
============================ */
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in environment variables");
}
if (!process.env.CLIENT_URL) {
  throw new Error("CLIENT_URL is missing in environment variables");
}

/* ============================
   MODELS
============================ */
import subscribersModel from "./model/subscribers.js";
import userModel from "./model/User.js";
import Order from "./model/orders.js";
import ContactUs from "./model/ContactUs.js";

/* ============================
   ROUTES
============================ */
import productRoute from "./Router/product.route.js";
import featuredRoute from "./Router/Featured.route.js";
import bestSellingRoute from "./Router/Bestselling.route.js";
import categorizedRoute from "./Router/Categorised.route.js";
import paymentRoute from "./Router/payment.route.js";

/* ============================
   MIDDLEWARE
============================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* ============================
   API ROUTES
============================ */
app.use("/api", productRoute);
app.use("/api", featuredRoute);
app.use("/api", bestSellingRoute);
app.use("/api", categorizedRoute);
app.use("/api/payment", paymentRoute);

/* ============================
   HEALTH CHECK
============================ */
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* ============================
   NEWSLETTER
============================ */
app.post("/api/newsLetter", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const exists = await subscribersModel.findOne({ email });
    if (exists) return res.status(409).json({ message: "Already subscribed" });

    await subscribersModel.create({ email });
    res.status(201).json({ message: "Subscribed successfully" });
  } catch {
    res.status(500).json({ error: "Subscription failed" });
  }
});

/* ============================
   CONTACT US
============================ */
app.post("/api/ContactUs", async (req, res) => {
  try {
    const { name, email, order, subject, message } = req.body;

    const contact = await ContactUs.create({
      name,
      email,
      orderNumber: order,
      subject,
      message,
    });

    res.status(201).json({ message: "Saved", contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

/* ============================
   AUTH MIDDLEWARE
============================ */
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

/* ============================
   START SERVER
============================ */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
