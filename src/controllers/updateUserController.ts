import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Users, { IUsers } from '../model/Users'
import userResponse from './commonFunctions/userResponse'

const secret = process.env.SECRET ||  ''

export default async function updateUser(req: Request, res: Response){
    const { user, token, observation }: 
    { user: string, token: string, observation: string } = req.body

    function verifyToken(token: string, User: IUsers): number | boolean {
        let res: number | boolean = false
        function finder(element: string){
            return (element === token)
        }
        const index = User.seasons.findIndex(finder)
        if (index >= 0) res = index
        return res
    }

    if (!token) return res.json({ message: 'token error' })

    const decodedToken: any = jwt.verify(token, secret)

    if (!decodedToken.id) return res.json({ message: 'token error' })
    
    const User = await Users.findById(decodedToken.id)

    if (!user || !User.active || user !== User.user) return res.json({message: 'token error'})

    const seasonIndex = verifyToken(token, User)

    if (typeof seasonIndex === 'boolean') return res.json({message: 'token error'})

    const updatedUser = await Users.findByIdAndUpdate(
        User._id,
        { observation },
        { new: true }
    )

    return res.json({
        user: userResponse(updatedUser)
    })
}