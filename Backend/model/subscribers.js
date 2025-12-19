const mongoose = require("mongoose")

// Instead of hardcoding
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });



const subscribersSchema = new mongoose.Schema({
    email : {
        type : String  
    }
})

const Subscriber = mongoose.model("subscribers", subscribersSchema)

module.exports = Subscriber