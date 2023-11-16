import MongooseService from "../../services/mongoose.service"
import { model, Schema, Model, Document } from "mongoose"
import { scrypt, randomBytes } from "crypto"
import { promisify } from "util"
import { IUser } from "./user.interface"
import { Password } from "../../services/password.service"
const scryptAsync = promisify(scrypt)
export interface UserDocument extends Document {
    email: string
    password: string
    username: string
    balance: number
}
interface UserModel extends Model<UserDocument> {
    build(attrs: IUser): UserDocument
}
const UserSchema: Schema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        username: { type: String, required: true },
        balance: { type: Number, require: true, default: 0}
    },
    {
        toObject: {
            // tslint:disable-next-line
            transform(doc, ret) { },
        },
        toJSON: {
            transform(doc, ret) {
                delete ret.password
            },
        },
    }
)
UserSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashed = await Password.toHash(this.get("password"))
        this.set("password", hashed)
    }
    done()
})

UserSchema.pre("updateOne", async function (done) {
    if (this.getUpdate().password) {
        const hashed = await Password.toHash(this.getUpdate().password)
        this.getUpdate().password = hashed
    }
    done()
})
UserSchema.statics.build = (attrs: IUser) => {
    return new User(attrs)
}
const User = MongooseService.getInstance().model<UserDocument, UserModel>(
    "User",
    UserSchema
)
export default User