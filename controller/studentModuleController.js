const classes = require("../models/classModel")
const students = require("../models/studentModel")
const jwt = require('jsonwebtoken')



// student login
exports.studentLoginContrller = async (req, res) => {
    const { register, password } = req.body

    try {
        const existingStudent = await students.findOne({ register, passkey: password })
        // console.log(existingStudent);

        if (existingStudent) {
            const token = jwt.sign({ userId: existingStudent._id }, 'eduTrakOpen')
            res.status(200).json({ existingStudent, token })
        }
        else {
            res.status(406).json('Invalid Credentilas !')
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// geting class of student
exports.getClassForStudentControlller = async (req, res) => {
    const { id } = req.params

    try {
        const result = await classes.findById({_id:id})
        res.status(200).json(result)
    } catch (error) {
        res.status(401).json(error)
    }
}