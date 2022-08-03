import MongooseService from "../services/mongoose.service"
import { model, Schema, Model, Document, Types } from "mongoose"

interface IOrder {
    user: Types.ObjectId
    himservices: Types.Array<Types.ObjectId>
    himchistka: Types.ObjectId
    status: string
}

const OrderSchema = new Schema<IOrder>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    himservices: [{ type: Schema.Types.ObjectId, required: true, ref: "Himservice" }],
    himchistka: { type: Schema.Types.ObjectId, required: true, ref: "Himchistka" },
    status: { type: String, enum: ['Open', 'Closed', 'InProgress'], default: 'Closed' }
})

const Order = MongooseService.getInstance().model<IOrder>('Order', OrderSchema)

export default Order