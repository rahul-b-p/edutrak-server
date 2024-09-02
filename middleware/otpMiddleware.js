const nodeMailer = require('nodemailer')
const crypto = require('crypto')
const authdatas = require('../models/otpModel')

exports.otpMailSetup = async (req, res) => {

    const toAdress = req.body.email
    const otp = crypto.randomInt(100000, 999999).toString()
    const authData= new authdatas({
        email:toAdress,
        otp
    })
    await authData.save()
    try {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAILID,
                pass: process.env.EMAILPSWD
            }
        })
        const mailOptions = {
            from: process.env.EMAILID,
            to: toAdress,
            subject: 'Your OTP for Logging in EduTrak',
            text: `Your OTP code is ${otp}. Please do not share this OTP with anyone. It will expire within 5 minutes.`
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(406).json(error)
            }
            else {
                res.status(200).json(otp)
            }
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.verifyOtp = async (req, res,next) => {
    const {userOtp,email} = req.body
    // console.log(otp,email);
    try {
         const authData = await authdatas.findOne({email})
         if(authData && authData.otp==userOtp){
            next()
         }
         else{
            res.status(406).json('Authentication failed due to an invalid OTP or the OTP has expired. Please try again.')
         }
    } catch (error) {
        res.status(400).json(error)
    }
    

}

