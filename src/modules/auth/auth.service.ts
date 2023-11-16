import User from "../user/user.model"
import { IChangePassword, IUser } from "../user/user.interface"
class AuthService {
    async createUser(data: IUser) {
        try {
            const user = User.build(data)
            await user.save()
        } catch (e) {
            throw new Error(e)
        }
    }
    async findUserByEmail(email: string) {
        return User.findOne({
            email,
        }).exec()
    }

    async changePassword(data: IChangePassword) {
        try {
            const changedUser = User.updateOne({email: data.user.email}, {password: data.password}).then((users) => {
                if (!users) {
                    console.log("users not found")
                } else {
                    return users;
                }
            })
        } catch (e) {
            throw new Error(e)
        }
    }
}
export default new AuthService()