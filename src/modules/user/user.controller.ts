import { Request, Response, NextFunction } from "express"
import UserService from './user.service'
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

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        const username = req.user.username;
        try {
            await UserService.deleteUserByUsername(username)
        }
        catch (e) {
            next(e);
        }
    }
}
export default new UserController()