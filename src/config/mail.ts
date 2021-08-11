import { IConfig } from "../@types/Mail.types";
const { MAIL_HOST, MAIL_USER, MAIL_PASS } = process.env

const Config: IConfig = {
    host: MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    }
}

export default Config