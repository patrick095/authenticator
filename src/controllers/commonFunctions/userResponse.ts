import { IUserResponse } from "../../@types/Users.types"


export default function userResponse(User: any): IUserResponse {
    const { name, email, observation, expires, admin, active, user } = User
    return { name, email, observation, expires, admin, active, user }
}