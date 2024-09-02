const students = require("../models/studentModel")

exports.addStudentController = async (req, res) => {
    const { userId, classId, passkey, register, name } = req.body

    try {
        const existingStudent = await students.findOne({ classId, register })
        if (existingStudent) {
            res.status(406).json('Already existing student')
        }
        else {
            const newStudent = new students({
                register,
                name,
                passkey,
                userId,
                classId,
                marks: {
                    term1: null,
                    term2: null,
                    total: null
                },
                attendance: {
                    total: null,
                    present: null,
                    percentage: null
                }
            })
            await newStudent.save()
            res.status(200).json(newStudent)
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getAllStudentsController = async (req, res) => {
    const classId = req.headers.classid
    // console.log(classId);

    try {
        const allStudents = await students.find({ classId })
        res.status(200).json(allStudents)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.deleteStudentController = async (req, res) => {
    const { id } = req.params
    // console.log(id);


    try {
        const deleteClass = await students.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteClass)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.editStudentController = async (req, res) => {
    const { id } = req.params
    const { name, register } = req.body

    try {
        const editedClass = await students.findByIdAndUpdate({ _id: id }, {
            name, register
        })
        await editedClass.save()
        res.status(200).json(editedClass)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.addMarksController = async (req, res) => {
    const { id } = req.params
    const { term } = req.body
    console.log(term);



    if (term == 't1') {
        const { term1 } = req.body
        try {
            const studentData = await students.findById({ _id: id })
            const term2 = studentData.marks.term2
            if (!term2) {
                const total = term1
                const updated = await students.findByIdAndUpdate({ _id: id }, {
                    marks: {
                        term1, total
                    }
                })
                await updated.save()
                res.status(200).json('Marks added')
            }
            else {
                const total = Number(term1) + Number(term2)
                const updated = await students.findByIdAndUpdate({ _id: id }, {
                    marks: {
                        term1, term2, total
                    }
                })
                await updated.save()
                res.status(200).json('Marks added')
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
    else if (term == 't2') {
        const { term2 } = req.body
        try {
            const studentData = await students.findById({ _id: id })
            const term1 = studentData.marks.term1
            if (!term1) {
                const total = term2
                const updated = await students.findByIdAndUpdate({ _id: id }, {
                    marks: {
                        term2, total
                    }
                })
                await updated.save()
                res.status(200).json('Marks added')
            }
            else {
                const total = Number(term1) + Number(term2)
                const updated = await students.findByIdAndUpdate({ _id: id }, {
                    marks: {
                        term1, term2, total
                    }
                })
                await updated.save()
                res.status(200).json('Marks added')
            }
        } catch (error) {
            res.status(400).json(error)
        }

    }

}

exports.addAttendanceController = async(req, res) =>{
    const { total, present } = req.body
    const { id } = req.params
    const percentage = ((Number(present)/Number(total))*100).toFixed(2)

    try {
        const updatedStudent = await students.findByIdAndUpdate({_id:id},{
            attendance:{
                total,present,percentage
            }
        })
        await updatedStudent.save()
        res.status(200).json('Updated Successfully')
    } catch (error) {
        res.status(401).json(error)
    }
}