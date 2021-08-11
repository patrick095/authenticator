import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import Users from '../model/Users'

const saltRounds = parseInt(process.env.SALT_ROUNDS) || 13
const salt = bcrypt.genSaltSync(saltRounds)

export default async function changePassword(req: Request, res: Response){
    const { user, password, newPassword }: 
    { user: string, password: string, newPassword: string} = req.body

    const User = await Users.findOne({ user })

    if (!User) return res.json({ message: 'wrong username or password'})

    else if (!await bcrypt.compare(password, User.password)) return res.json({ message: 'wrong username or password'})

    else if (!User.active) return res.json({ message: 'user is not actived'})

    const newPasswordHash = bcrypt.hashSync(newPassword, salt)

    const userWithNewPassword = await Users.findByIdAndUpdate(
        User._id,
        { 
            password: newPasswordHash 
        }
    )

    if (userWithNewPassword === null) return res.json({message: 'error on change password'})

    return res.json({
        message: 'password changed successfully'
    })
}