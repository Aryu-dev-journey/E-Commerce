const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

// ==========================================================
// MONGODB CONNECTION 
// ==========================================================
const connectDB = async () => {
  try {
    // Use environment variable or fallback to localhost
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/ecom";
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${mongoURI.includes('localhost') ? 'Local' : 'Atlas'}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Connect to database
connectDB();

const app = express();
const port = 3000;

// MODELS
const subscribersModel = require("./model/subscribers");
const userModel = require("./model/User");
const Order = require("./model/orders");
const ContactUs = require("./model/ContactUs");

// ROUTES
const productRoute = require("./Router/product.route");
const featuredRoute = require("./Router/Featured.route");
const bestSellingRoute = require("./Router/Bestselling.route");
const categorizedRoute = require("./Router/Categorised.route");
const paymentRoute = require("./Router/payment.route");

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS (must allow credentials)
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://e-commerce-xi-amber.vercel.app/"
        : "http://localhost:5173",
    credentials: true,
  })
);

// ROUTE IMPORT
app.use("/api", productRoute);
app.use("/api", featuredRoute);
app.use("/api", bestSellingRoute);
app.use("/api", categorizedRoute);
app.use("/api/payment", paymentRoute);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ==========================================================
// 📩 NEWSLETTER
// ==========================================================
app.post("/api/newsLetter", async (req, res) => {
  try {
    const { email } = req.body;
    await subscribersModel.create({ email });
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Subscription failed", details: err });
  }
});

// ==========================================================
// ✉️ CONTACT US
// ==========================================================
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
    console.error("ContactUs error:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

// ==========================================================
// 👤 REGISTER
// ==========================================================
app.post(
  "/api/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
    body("name").trim().notEmpty(),
  ],
  async (req, res) => {
    // Validate user input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Save new user
      const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      // Generate JWT
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );

      // Set cookie
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          message: "Registration successful",
          user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ error: "Registration failed" });
    }
  }
);

// ==========================================================
// 🔐 LOGIN
// ==========================================================
app.post(
  "/api/login",
  [body("email").isEmail().normalizeEmail(), body("password").notEmpty()],
  async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await userModel.findOne({ email });
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );

      // Send JWT cookie
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          message: "Login successful",
          user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Login failed" });
    }
  }
);

// ==========================================================
// 🔐 AUTH MIDDLEWARE (COOKIE BASED)
// ==========================================================
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "No token found" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });

    req.user = user;
    next();
  });
};

// ==========================================================
// 👤 AUTO LOGIN (PROFILE)
// ==========================================================
app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// ==========================================================
// LOGOUT (CLEAR COOKIE)
// ==========================================================
app.post("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.json({ message: "Logged out" });
});

app.get("/api/charts/sales", authenticateToken, async (req, res) => {
  try {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);

    const sales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: last7Days },
          status: "paid", // ✅ only paid orders
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          revenue: { $sum: "$amount" }, // ✅ correct field
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const formatted = sales.map((s) => ({
      date: days[s._id - 1],
      revenue: s.revenue,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Sales chart error:", err);
    res.status(500).json({ error: "Failed to load sales chart" });
  }
});

app.get("/api/charts/order-status", authenticateToken, async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const formatted = stats.map((s) => ({
      status: s._id,
      count: s.count,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Order status chart error:", err);
    res.status(500).json({ error: "Failed to load order status chart" });
  }
});

// ==========================================================
// START SERVER
// ==========================================================
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});