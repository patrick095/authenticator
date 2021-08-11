import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Users from '../model/Users'
import userResponse from './commonFunctions/userResponse'

const secret = process.env.SECRET ||  ''

export default async function activateAccount(req: Request, res: Response){
    const token: string = req.query.token as string
    const user: string = req.query.user as string
    const userToActivate = await Users.findOne({ user })
    
    if (!userToActivate) return res.json({message: "user not registered"})

    const decoded = jwt.verify(token, secret )
    
    if (typeof decoded === 'string') return res.json({ message: "error on activate"})

    if (decoded.user === user) {
        const newToken = jwt.sign({ id: userToActivate._id }, secret, { expiresIn: 1000*3600 }) //expira em 1h
        const activedUser = await Users.findOneAndUpdate(
            {   
                user
            },
            {   
                active: true,
                seasons: [...userToActivate.seasons, newToken ]
            }, {   
                new: true
            }
        )
        
        if (!activedUser) return res.json({message: 'error on activate user'})
        return res.json({
            user: userResponse(activedUser),
            token: newToken
        })
    }
    return res.json({ message: 'error on active user' })
}