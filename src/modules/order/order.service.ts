import Order from './order.model'
import debug from 'debug';
import mongoose from "mongoose"

class OrderService {
    async getAll() {
        return Order.find({}).populate(['user', 'himservices', 'himchistka'])
    }
    async createOrder(userId: string, himservicesId: string[], himchistkaId: string) {
        const user = new mongoose.Types.ObjectId(userId)
        const himservices = himservicesId.map(himId => new mongoose.Types.ObjectId(himId))
        const himchistka = new mongoose.Types.ObjectId(himchistkaId)
        const newOrder = new Order({ user, himservices, himchistka })
        return newOrder.save((err) => {
            if (err) return debug.log(err)
        })
    }
    async removeOrder(id: string) {
        const order = Order.findByIdAndRemove(id).then((orders) => {
            if (!orders) {
                debug.log("order not found");
            } else {
                return orders;
            }
        })
    }
    async updateOrder(id: string, status: string) {
        const order = Order.updateOne({ _id: id }, { status }).then((orders) => {
            if (!orders) {
                debug.log("order not found");
            } else {
                return orders;
            }
        })

    }
}
export default new OrderService()