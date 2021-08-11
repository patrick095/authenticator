import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import Users from '../model/Users'
import { INewUser } from '../@types/Users.types'
import mail from '../services/mail'

const saltRounds = parseInt(process.env.SALT_ROUNDS) || 13
const salt = bcrypt.genSaltSync(saltRounds)

export default async function signUp(req: Request, res: Response){
    const { name, user, email, password, observation }: INewUser = req.body
    try {
        if (await Users.findOne({ user })) {
            return res.json({
                message:'Nome de usuário já cadastrado'})
        }
        if (await Users.findOne({ email })) {
            return res.json({
                message:'Email já cadastrado'
            })
        }
        const passwordHash = bcrypt.hashSync(password, salt)
        const registeredUser = await Users.create({
            name, user, email, observation,
            password: passwordHash
        })
        registeredUser.password = ''
        // função para ativar a conta
        // const activateAccountToken = jwt.sign({ id: User._id }, secret, { expiresIn: 1000*3600*24*7 }) // expira em 7 dias
        // await mail.sendMail({
        //     to: email,
        //     subject: "Conta cadastrada - Ative sua conta",
        //     message: `
        //     <h1>Conta cadastrada com sucesso!</h1>
        //     <h2>Para ativar sua conta clique no link abaixo</h2>
        //     <a href="https://<your-website>/active?token=${activateAccountToken}&user=${user}" target="_blank" >Clique aqui para ativar</a>
        //     `
        // })
        return res.json({
            message: 'account successfully registered, access your email to activate your account'
        })
    }
    catch {
        return res.json({message: 'error registering'});
    }
}