import nodemailer from 'nodemailer'
import { IMail } from '../@types/Mail.types'
import config from '../config/mail'

const { MAIL_FROM } = process.env

export default {
    async sendMail({to, subject, message}: IMail) {
        const mailOptions = {
            from: MAIL_FROM,
            to,
            subject,
            html: message
        }

        const transporter = nodemailer.createTransport(config)

        return transporter.sendMail(mailOptions, async (error, info) =>{
            if (error) {
                return error
            } else {
                return info
            }
        })
    }
}