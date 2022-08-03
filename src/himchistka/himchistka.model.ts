import MongooseService from "../services/mongoose.service"
import { model, Schema, Model, Document } from "mongoose"

interface IHimchistka {
    name: string
    address: string
}

const HimchistkaSchema = new Schema<IHimchistka>({
    name: { type: String, required: true },
    address: { type: String, required: true },
})

const Himchistka = MongooseService.getInstance().model<IHimchistka>('Himchistka', HimchistkaSchema)

export default Himchistka