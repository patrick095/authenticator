import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Users from '../model/Users'

const secret = process.env.SECRET ||  ''


export default async function deleteUser(req: Request, res: Response){
    const token: string = req.body.token as string
    const user: string = req.body.user as string

    const userToDelete = await Users.findOne({ user })
    
    if (!userToDelete) return res.json({message: "user not found"})

    const decoded = jwt.verify(token, secret )
    
    if (typeof decoded === 'string') return res.json({ message: "error on delete"})

    if (decoded.id === userToDelete.id) {
        const desactivedUser = await Users.findByIdAndDelete(decoded.id)

        if (!desactivedUser) return res.json({message: 'error on delete user'})
        return res.json({
            message: 'user deleted successfully'
        })
    }
    return res.json({ message: 'error on delete user' })
}