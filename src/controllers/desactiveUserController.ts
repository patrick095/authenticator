import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Users from '../model/Users'
import userResponse from './commonFunctions/userResponse'

const secret = process.env.SECRET ||  ''

export default async function desactiveUser(req: Request, res: Response){
    const token: string = req.body.token as string
    const user: string = req.body.user as string

    const userToDesactive = await Users.findOne({ user })
    
    if (!userToDesactive) return res.json({message: "user not found"})

    const decoded = jwt.verify(token, secret )
    
    if (typeof decoded === 'string') return res.json({ message: "error on desactive"})

    if (decoded.id === userToDesactive.id) {
        const desactivedUser = await Users.findOneAndUpdate(
            {   
                user
            },
            {   
                active: false,
                seasons: []
            }, {   
                new: true
            }
        )

        /// envia um email par ao usuário poder ativar novamente caso queira
        
        if (!desactivedUser) return res.json({message: 'error on desactive user'})
        return res.json({
            user: userResponse(desactivedUser)
        })
    }
    return res.json({ message: 'error on desactive user' })
}