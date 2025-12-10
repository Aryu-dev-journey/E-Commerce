const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ecom");

const OrderSchema = new mongoose.Schema({

    name: 
        { 
         type: String,
         required: true 
        },
    email:
        { 
         type: String,
         required: true
        },
    Address:
        {
        type: String,
        required: true,
        },
    Payment:
        {
        type: String,
        required: true,
        },
    PaymentAddress:
        {
        type: String,
        required: true, 
        },

});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
