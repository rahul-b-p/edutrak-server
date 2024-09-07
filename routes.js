const express = require('express')

// teacherController
const teacherController = require('./controller/teacherController')
const otpMiddleware = require('./middleware/otpMiddleware')
const jwt = require('./middleware/jwtMiddleware')
const classController = require('./controller/classController')
const studentController = require('./controller/studentController')
const studentModuleContrller = require('./controller/studentModuleController')
const subScribeControler = require('./controller/subscribeController')

const router = new express.Router()

// 1) Teacher Registration 
router.post('/send-otp', otpMiddleware.otpMailSetup)
router.post('/teacherreg', otpMiddleware.verifyOtp, teacherController.registrationController)

// 2) Teacher Login
router.post('/tchrlogin', teacherController.loginController)

// 3) Class
router.post('/add-class',jwt,classController.addClassController)
router.get('/get-class',jwt,classController.getClassController)
router.put('/edit-class/:id',jwt,classController.editClassController)
router.delete('/delete-class/:id',jwt,classController.deleteClassController)

// 4)student for teacher
router.post('/add-student',jwt,studentController.addStudentController)
router.get('/get-student',jwt,studentController.getAllStudentsController)
router.delete('/delete-student/:id',studentController.deleteStudentController)
router.put('/edit-student/:id',studentController.editStudentController)
router.put('/add-mark/:id',studentController.addMarksController)
router.put('/add-attendance/:id',studentController.addAttendanceController)

// 5)Student Module
router.post('/student-login',studentModuleContrller.studentLoginContrller)
router.get('/get-class-student/:id',jwt,studentModuleContrller.getClassForStudentControlller)

// subscribe
router.post('/subscribe',subScribeControler.subScribeControler)

module.exports = router