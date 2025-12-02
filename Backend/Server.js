const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const subscribersModel = require("./model/subscribers");
const userModel = require("./model/User");

const productRoute = require("./Router/product.route");
const featuredroute = require("./Router/Featured.route");
const BestSellings = require("./Router/Bestselling.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/api", productRoute);
app.use("/api", featuredroute);
app.use("/api", BestSellings);

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

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await userModel.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed", details: err });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Email not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Wrong password" });
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err });
  }
});

app.listen(port, () => {
  console.log(`Database is running on port ${port}`);
});
