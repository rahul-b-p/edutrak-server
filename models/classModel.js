const mongoose = require('mongoose')

const clasSchema = new mongoose.Schema({
    batch:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    eligiblity:{
        mark:{
            type:Number,
            required:true
        },
        attendance:{
            type:Number,
            required:true
        }
    }
})


const classes = mongoose.model('classes', clasSchema)

module.exports = classes