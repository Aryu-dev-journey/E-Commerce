const mongoose = require("mongoose");

// Instead of hardcoding
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
