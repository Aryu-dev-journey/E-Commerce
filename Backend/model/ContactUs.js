const mongoose = require("mongoose");

// Instead of hardcoding
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const ContactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: Number,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const ContactUs = mongoose.model("ContactUs", ContactUsSchema);

module.exports = ContactUs;
