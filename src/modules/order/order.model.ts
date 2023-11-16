import MongooseService from "../../services/mongoose.service"
import mongoose, { model, Schema, Model, Document, Types } from "mongoose"

interface IOrder {
    user: Types.ObjectId
    himservices: Types.Array<Types.ObjectId>
    himchistka: Types.ObjectId
    status: string
    sum: number
    dateAdded: Date
}

const OrderSchema = new Schema<IOrder>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    himservices: [{ type: Schema.Types.ObjectId, required: true, ref: "Himservice" }],
    himchistka: { type: Schema.Types.ObjectId, required: true, ref: "Himchistka" },
    status: { type: String, enum: ['Open', 'Closed', 'InProgress'], default: 'Closed' },
    sum: {type: Number, default: 0},
    dateAdded: {type: Date, required: true}
})

OrderSchema.pre('save', async function (next) {
    try{
        const himservices = this.himservices;

        const result = await mongoose.model('Himservice').aggregate([
            {
                $match: {
                    _id: { $in: himservices.map(service=> service._id)}
                }
            },
            {
                $group: {
                    _id: null,
                    sum: {$sum: '$cost'}
                }
            }
        ]);

        this.sum = result.length > 0 ? result[0].total : 0;
        next()
    }catch (error) {
        next(error)
    }
})

const Order = MongooseService.getInstance().model<IOrder>('Order', OrderSchema)

export default Order