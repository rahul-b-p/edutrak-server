const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const subscribers = mongoose.model('subscribers',subscriberSchema)

module.exports = subscribers