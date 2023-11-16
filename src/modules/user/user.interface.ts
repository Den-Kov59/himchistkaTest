export interface IUser {
    email: string,
    password: string,
    username: string,
    balance: number
}

export interface IChangePassword {
    user: IUser,
    password: string
}

export interface IChangeUser {
    email?: string,
    password?: string,
    username?: string,
    balance?: number
}