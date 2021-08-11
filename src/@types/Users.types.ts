export interface IUserSignIn {
    user: string;
    password: string;
}
export interface IUsers {
    name: string;
    user: string;
    password: string;
    email: string;
    observation: string;
    active: boolean;
    admin: boolean;
    token: string[];
    expires: Date;
}
export interface IUserResponse {
    name: string,
    user: string,
    email: string,
    observation: string,
    admin?: boolean,
    active: boolean,
    expires: Date
}

export interface INewUser {
    name: string,
    user: string,
    email: string,
    password: string,
    observation: string
}
export interface IVerifyUser {
    token: string,
    user: string
}
export interface IVerifyToken {
    isTrue: boolean,
    index: number
}
export interface IChangePassword {
    user: string,
    email: string,
    oldPassword: string,
    newPassword: string
}
export interface IUpdateUser {
    user: string,
    token: string,
    observation: string
}
export interface Decoded {
    id: string,
    user: string
}