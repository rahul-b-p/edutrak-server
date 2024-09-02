const mongoose = require('mongoose')

const teacherShema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    institution:{
        type:String,
        required:true
    }
})


const teachers = mongoose.model('teachers',teacherShema)

module.exports = teachers