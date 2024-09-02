const students = require("../models/studentModel")



// student login
exports.studentLoginContrller=async(req,res)=>{
    const {register, password} = req.body

    try {
        const existingStudent = await students.findOne({register,passkey})
        if(existingStudent){
            res.status(200).json(existingStudent)
        }
        else{
            res.status(406).json('Invalid Credentilas !')
        }
    } catch (error) {
        res.status(401).json(error)
    }
}