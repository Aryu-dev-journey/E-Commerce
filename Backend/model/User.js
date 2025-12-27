const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/ecom");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
