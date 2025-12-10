const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const app = express();
const port = 3000;

const subscribersModel = require("./model/subscribers");
const userModel = require("./model/User");
const Order = require("./model/orders")
const ContactUs = require("./model/ContactUs")

const productRoute = require("./Router/product.route");
const featuredroute = require("./Router/Featured.route");
const BestSellings = require("./Router/Bestselling.route");
const Categorised = require("./Router/Categorised.route")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// More secure CORS configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://yourdomain.com"
        : "http://localhost:5173", // or your frontend port
    credentials: true,
  })
);

app.use("/api", productRoute);
app.use("/api", featuredroute);
app.use("/api", BestSellings);
app.use("/api",Categorised)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/newsLetter", (req, res) => {
  const { email } = req.body;

  subscribersModel
    .create({ email })
    .then(() => res.status(201).json({ message: "Subscribed successfully" }))
    .catch((err) =>
      res.status(500).json({ error: "Subscription failed", details: err })
    );
});

// Registration with password hashing
app.post(
  "/api/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
    body("name").trim().notEmpty(),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "Email already registered" });
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
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

      res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ error: "Registration failed" });
    }
  }
);

// Login with password verification
app.post(
  "/api/login",
  [body("email").isEmail().normalizeEmail(), body("password").notEmpty()],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await userModel.findOne({ email });

      if (!user) {
        // Don't reveal whether email exists
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Compare hashed password
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

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Login failed" });
    }
  }
);

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Protected route example
app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.post("/api/Order",  
//    [
//     body("email").isEmail().normalizeEmail(),
//     body("password").isLength({ min: 8 }),
//     body("name").trim().notEmpty(),
//   ],)


