import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Users, { IUsers } from '../model/Users'

const secret = process.env.SECRET ||  ''

export default async function refreshToken(req: Request, res: Response){
    const { token }: { token: string } = req.body

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
    
    const user = await Users.findById(decodedToken.id)
    if (!user || !user.active) return res.json({message: 'token error'})

    const seasonIndex = verifyToken(token, user)

    if (typeof seasonIndex === 'boolean') return res.json({message: 'token error'})

    const newToken = jwt.sign({ id: user._id }, secret, { expiresIn: 1000*3600 }) //expira em 1h
    user.seasons.splice(seasonIndex, 1, newToken)

    const userWithNewToken = await Users.findByIdAndUpdate(
        user._id,
        { seasons: user.seasons },
        { new: true }
    )

    return res.json({
        token: newToken
    })
}