import MongooseService from "../../services/mongoose.service"
import { model, Schema, Model, Document, Types } from "mongoose"

interface IHimchistka {
    name: string
    address: string
    description: string
    himservices: Types.Array<Types.ObjectId>
    images: Types.Array<string>
}

const HimchistkaSchema = new Schema<IHimchistka>({
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: false },
    himservices: [{ type: Schema.Types.ObjectId, required: true, ref: "Himservice" }],
    images: [{type: String, required: false}]
})

const Himchistka = MongooseService.getInstance().model<IHimchistka>('Himchistka', HimchistkaSchema)

export default Himchistka