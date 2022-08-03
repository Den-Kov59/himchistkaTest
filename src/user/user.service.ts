import User from "../User/user.model";
import { IUser } from "../User/user.interface";
import debug from 'debug';
class UserService {
    async findUserByEmail(email: string) {
        return User.findOne({
            email: email,
        }).exec();
    }

    async createUser(user: IUser) {
        const newUser = new User(user)
        return newUser.save(function (err) {
            if (err) return debug.log(err);
        }
        )
    }

    async deleteUserByUsername(username: string) {
        const user = User.findOneAndRemove({ username: username }).then((user) => {
            if (!user) {
                debug.log("user not found");
            } else {
                debug.log(username + " was deleted");
            }
        })
    }
}

export default new UserService();