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
        return newOrder.save(function (err) {
            if (err) return debug.log(err)
        })
    }
    async removeOrder(id: string) {
        const order = Order.findByIdAndRemove(id).then((order) => {
            if (!order) {
                debug.log("order not found");
            } else {
                return order;
            }
        })
    }
    async updateOrder(id: string, status: string) {
        const order = Order.updateOne({ _id: id }, { status }).then((order) => {
            if (!order) {
                debug.log("order not found");
            } else {
                return order;
            }
        })

    }
}
export default new OrderService()