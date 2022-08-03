import MongooseService from "../services/mongoose.service"
import { model, Schema, Model, Document } from "mongoose"

interface IHimservice {
    name: string
    cost: number
}

const HimserviceSchema = new Schema<IHimservice>({
    name: { type: String, required: true },
    cost: { type: Number, required: true },
})

const Himservice = MongooseService.getInstance().model<IHimservice>('Himservice', HimserviceSchema)

export default Himservice