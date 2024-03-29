import { NextFunction, Request, Response } from "express"
import AuthService from "./auth.service"
import jwt from "jsonwebtoken"
import debug, { IDebugger } from "debug"
import { Password } from "../../services/password.service"
const jwtSecret: string = process.env.JWT_SECRET || "123456"
const tokenExpirationInSeconds = 36000000
const log: IDebugger = debug("auth:controller")
class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.body.email
            const password = req.body.password
            const user = await AuthService.findUserByEmail(email)
            log("user", user)
            if (user) {
                const isPasswordMatch = await Password.compare(user.password, password)
                if (!isPasswordMatch) {
                    throw new Error("Invalid Password")
                } else {
                    log("jwt Secret", jwtSecret)
                    const token = jwt.sign(req.body, jwtSecret, {
                        expiresIn: tokenExpirationInSeconds,
                    })
                    return res.status(200).json({
                        success: true,
                        data: user,
                        token,
                    })
                }
            } else {
                log("User Not Found")
                return res.status(200).json({
                    success: false,
                    message: 'CredentialsSignin: User Not Found'
                })
            }
        } catch (e) {
            next(e)
        }
    }
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.body.username
            const email = req.body.email
            const password = req.body.password
            const user = await AuthService.findUserByEmail(email)
            log("user", user)
            if (user) {
                throw new Error("User Already Exists")
            } else {
                try {
                    const newUser = await AuthService.createUser({
                        username,
                        email,
                        password,
                        balance: 0
                    })
                    const token = jwt.sign({ username, password }, jwtSecret, {
                        expiresIn: tokenExpirationInSeconds,
                    })
                    return res.status(200).json({
                        success: true,
                        data: newUser,
                        token,
                    })
                } catch (e) {
                    log("Controller capturing error", e)
                    throw new Error("Error while register")
                }
            }
        } catch (e) {
            next(e)
        }
    }

    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.body.email
            const password = req.body.password
            const user = await AuthService.findUserByEmail(email)
            log("user", user)
            if (!user) {
                throw new Error("User Not Exists")
            } else {
                try {
                    const newUser = await AuthService.changePassword({
                        user,
                        password
                    })
                    return res.status(200).json({
                        success: true,
                        data: newUser,
                    })
                } catch (e) {
                    throw new Error("Error while changing password")
                }
            }
        } catch (e) {
            next(e)
        }
    }
}
export default new AuthController()