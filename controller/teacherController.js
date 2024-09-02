const teachers = require("../models/teacherModel")

const jwt = require('jsonwebtoken')

// registration
exports.registrationController = async (req, res) => {
    const { username, institution, email, password } = req.body

    try {
        const existingTeacher = await teachers.findOne({ email })
        if (existingTeacher) {
            res.status(406).json('User already exists')
        } else {
            const newTeacher = new teachers({
                username,
                email,
                password,
                institution
            })
            await newTeacher.save()
            res.status(200).json(newTeacher)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// login
exports.loginController = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingTeacher = await teachers.findOne({ email })
        if (existingTeacher) {
            if (existingTeacher.password == password) {
                const token = jwt.sign({ userId: existingTeacher._id }, 'eduTrakOpen')
                res.status(200).json({ existingTeacher, token })
            }
            else {
                res.status(408).json('Incorrect Password')
            }
        }
        else {
            res.status(406).json('user does not exists')
        }
    } catch (error) {
        res.status(401).json(error)
    }
}