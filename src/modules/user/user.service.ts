import User from "../User/user.model";
import { IUser } from "../User/user.interface";
import debug from 'debug';
class UserService {
    async getAllUsers() {
        return User.find({})
    }
    async findUserByEmail(email: string) {
        return User.findOne({
            email,
        }).exec();
    }

    async createUser(user: IUser) {
        const newUser = new User(user)
        return newUser.save((err) => {
            if (err) return debug.log(err);
        }
        )
    }

    async deleteUserByUsername(username: string) {
        const user = User.findOneAndRemove({ username }).then((users) => {
            if (!users) {
                debug.log("users not found");
            } else {
                debug.log(username + " was deleted");
            }
        })
    }
}

export default new UserService();