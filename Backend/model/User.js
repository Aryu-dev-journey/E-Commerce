const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
