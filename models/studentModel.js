const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    register: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    passkey: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    classId: {
        type: String,
        required: true
    },
    marks: {
        term1: {
            type: Number
        },
        term2: {
            type: Number
        },
        total: {
            type: Number
        }
    },
    attendance: {
        total: {
            type: Number
        },
        present: {
            type: Number
        },
        percentage: {
            type: Number
        }
    }
})


const students = mongoose.model('students', studentSchema)

module.exports = students