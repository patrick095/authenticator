import { Request, Response } from 'express'
import Users from '../model/Users'
import userResponse from './commonFunctions/userResponse'

const SECRET = process.env.SECRET ||  ''

export default async function renewUser(req: Request, res: Response){
    const { user, secret, days }: 
    { user: string, secret: string, days: number } = req.body

    if (SECRET !== secret) return res.json({ message: "error on renew"})

    const userToRenew = await Users.findOne({ user })

    if (userToRenew.expires < new Date()) userToRenew.expires = new Date()

    const expires = userToRenew.expires.getTime() + 1000*3600*24*days

    const userRenewed = await Users.findOneAndUpdate(
        {
            user 
        },
        { 
            expires: new Date(expires)
        }, { 
            new: true 
        })

    return res.json({
        user: userResponse(userRenewed)
    })
}