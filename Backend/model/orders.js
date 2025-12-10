const mongoose = require("'mongoose")

mongoose.connect("mongodb://localhost:27017/ecom")

const OrderSchema = new mongoose.Schema({

})

const Order = mongoose.model("Order", OrderSchema)

module.exports = Order