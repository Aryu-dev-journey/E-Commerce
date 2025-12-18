const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI)


const subscribersSchema = new mongoose.Schema({
    email : {
        type : String  
    }
})

const Subscriber = mongoose.model("subscribers", subscribersSchema)

module.exports = Subscriber