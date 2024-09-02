const classes = require("../models/classModel")


// add class
exports.addClassController = async (req, res) => {
    const { batch, subject, eligibleMark, eligibleAttendance } = req.body
    const userId = req.payload
    try {
        const existingClass = await classes.findOne({ batch, subject })
        if (existingClass) {
            res.status(406).json('This class already exists')
        }
        else {
            const newClass = new classes({
                batch,
                subject,
                eligiblity: {
                    mark: eligibleMark,
                    attendance: eligibleAttendance
                },
                userId
            })
            await newClass.save()
            res.status(200).json(newClass)
        }
    } catch (error) {
        res.status(401).json(error)
    }
    // console.log(batch,subject,eligibleMark,eligibleAttendance,userId);
    // res.status(200).json('Check console')
}

// view class
exports.getClassController = async (req, res) => {
    const userId = req.payload
    try {
        const allClasses = await classes.find({userId})
        res.status(200).json(allClasses)
    } catch (error) {
        res.status(400).json(error)
    }
}

// edit class
exports.editClassController = async (req, res) => {
    const { batch, subject, eligibleMark, eligibleAttendance } = req.body
    const { id } = req.params
    const userId = req.payload

    try {
        const existingClass = await classes.findByIdAndUpdate({ _id: id }, {
            batch,
            subject,
            userId,
            eligiblity: {
                attendance: eligibleAttendance,
                mark: eligibleMark
            }
        })
        await existingClass.save()
        res.status(200).json(existingClass)
    } catch (error) {
        res.status(401).json(error)
        // console.log(error);

    }
}

// delete class
exports.deleteClassController = async (req, res) => {
    const {id} = req.params
    

    try {
        const deleteClass = await classes.findByIdAndDelete({_id:id})
        res.status(200).json(deleteClass)
    } catch (error) {
        res.status(401).json(error)
    }
}