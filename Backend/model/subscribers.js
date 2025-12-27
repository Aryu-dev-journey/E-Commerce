const mongoose = require("mongoose")

// mongoose.connect("mongodb://localhost:27017/ecom")


const subscribersSchema = new mongoose.Schema({
    email : {
        type : String  
    }
})

const Subscriber = mongoose.model("subscribers", subscribersSchema)

module.exports = Subscriber