import User from "./user.model";
import { IChangeUser, IUser } from "./user.interface";
import debug from 'debug';
import { mutateUpdate } from "../../services/update.service"
class UserService {
    async getAllUsers() {
        return User.find({})
    }
    async findUserByEmail(email: string) {
        return User.findOne({
            email,
        }).exec();
    }

    async getUserById(id: string) {
        return User.findById(id)
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

    async updateUser(id: string, userChanges: IChangeUser) {
        const user = mutateUpdate(userChanges)
        const newUser = User.updateOne({_id: id},  {$set: user }).then((users)=>{
            if (!users) {
                debug.log("users not found");
            } else {
                return users;
            }
        })
    }
}

export default new UserService();