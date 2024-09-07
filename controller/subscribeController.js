const nodeMailer = require('nodemailer')
const subscribers = require('../models/subscribersModel')


exports.subScribeControler = async (req, res) => {
    const { name, email, phone } = req.body

    try {
        const Subscriber = await subscribers.findOne({ email })
        if (Subscriber) {
            const transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAILID,
                    pass: process.env.EMAILPSWD
                }
            })
            const mailOptions = {
                from: process.env.EMAILID,
                to: email,
                subject: 'Alert to Subscriber',
                text: 'Someone try to subscribe from this account again, please be check it out'
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(406).json(error)
                }
                else {
                    res.status(200).json('notified')
                }
            })
        }
        else{
            const newSubscriber = new subscribers({
                email, name, phone
            })
            await newSubscriber.save()
            const transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAILID,
                    pass: process.env.EMAILPSWD
                }
            })
            const mailOptions = {
                from: process.env.EMAILID,
                to: email,
                subject: 'Subscribed Successfully',
                text: 'You are successfully subscribed edutrak'
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(406).json(error)
                }
                else {
                    res.status(200).json('notified')
                }
            })

        }
    } catch (error) {
        res.status(401).json(error)
    }
}