const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

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
const subscribersModel = require("./model/subscribers");
const userModel = require("./model/User");
const Order = require("./model/orders");
const ContactUs = require("./model/ContactUs");

/* ============================
   ROUTES
============================ */
const productRoute = require("./Router/product.route");
const featuredRoute = require("./Router/Featured.route");
const bestSellingRoute = require("./Router/Bestselling.route");
const categorizedRoute = require("./Router/Categorised.route");
const paymentRoute = require("./Router/payment.route");

/* ============================
   MIDDLEWARE
============================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, server-to-server)
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
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const exists = await subscribersModel.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Already subscribed" });
    }

    await subscribersModel.create({ email });
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
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
    console.error("ContactUs error:", err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

/* ============================
   REGISTER
============================ */
app.post(
  "/api/register",
  [
    body("name").trim().notEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || "7d" }
      );

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? "none" : "lax",
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

/* ============================
   LOGIN
============================ */
app.post(
  "/api/login",
  [body("email").isEmail(), body("password").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || "7d" }
      );

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? "none" : "lax",
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

/* ============================
   AUTH MIDDLEWARE
============================ */
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

/* ============================
   PROFILE
============================ */
app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.userId)
      .select("-password");
    res.json({ user });
  } catch {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

/* ============================
   LOGOUT
============================ */
app.post("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  res.json({ message: "Logged out" });
});

/* ============================
   CHARTS
============================ */
app.get("/api/charts/sales", authenticateToken, async (req, res) => {
  try {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);

    const sales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: last7Days },
          status: "paid",
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          revenue: { $sum: "$amount" },
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

    res.json(
      stats.map((s) => ({
        status: s._id,
        count: s.count,
      }))
    );
  } catch {
    res.status(500).json({ error: "Failed to load order status chart" });
  }
});

/* ============================
   START SERVER
============================ */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
