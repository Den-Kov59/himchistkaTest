import { Request, Response, NextFunction } from "express"
import UserService from './user.service'
import { IChangeUser, IUser } from "./user.interface"
class UserController {
    //    constructor() {}

    async getUsers(req: any, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getAllUsers()
            return res.status(200).json({
                success: true,
                data: users
            })
        } catch (e) {
            next(e)
        }

    }
    async getUser(req: Request, res: Response, next: NextFunction) {
        const email = req.user.email;
        try {
            const user = await UserService.findUserByEmail(email);

            return res.status(200).json({
                success: true,
                data: user,
            });
        } catch (e) {
            next(e);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const user = await UserService.getUserById(id)
            if(user) {
                return res.status(200).json({
                    success: true,
                    data: user
                })
            } else {
                return res.status(200).json({
                    success: false
                })
            }
        } catch (e) {
            next(e)
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        const username = req.user.username;
        try {
            await UserService.deleteUserByUsername(username)
        }
        catch (e) {
            next(e);
        }
    }

    async editUsers(req: Request, res:Response, next: NextFunction) {
        try{
            const userId = req.body.id;
            const newUser: IChangeUser = {
                username: req.body.name,
                email: req.body.email,
                password: req.body.password,
                balance: req.body.balance
            }
            const updatedUser = await UserService.updateUser(userId, newUser)
            return res.status(200).json({
                success: true,
                updatedUser,
        })
        }catch(e){
            next(e)
        }
    }
}
export default new UserController()