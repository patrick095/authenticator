import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Users from '../model/Users'
import { IUserSignIn } from '../@types/Users.types'
import userResponse from './commonFunctions/userResponse'

const secret = process.env.SECRET ||  ''

export default async function signIn(req: Request, res: Response){
    const { user, password }: IUserSignIn = req.body
    const User = await Users.findOne({ user })

    if (!User) return res.json({ message: 'wrong username or password'})

    else if (!await bcrypt.compare(password, User.password)) return res.json({ message: 'wrong username or password'})

    else if (!User.active) return res.json({ message: 'user is not actived'})

    const newToken = jwt.sign({ id: User._id }, secret, { expiresIn: 1000*3600 }) //expira em 1h

    let oldTokens = User.seasons || []
    if (oldTokens.length >= 10) {
        const randomDeleteSeason:number = Math.floor(Math.random()*(9));
        oldTokens.splice(randomDeleteSeason,1, newToken);
    }
    else {
        oldTokens.push(newToken);
    }
    const userWithNewSeason = await Users.findByIdAndUpdate(
        User._id,
        { seasons: oldTokens })
    if (userWithNewSeason === null) return res.json({message: 'error on login'})
    return res.json({
        user: userResponse(userWithNewSeason),
        token: newToken
    })
}