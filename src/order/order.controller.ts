import { Request, Response, NextFunction } from "express"
import OrderService from "./order.service";

class OrderController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const orders = await OrderService.getAll();

            return res.status(200).json({
                success: true,
                data: orders,
            });
        } catch (e) {
            next(e);
        }
    }

    async createOrder(req: Request, res: Response, next: NextFunction) {

        try {
            const userId = req.body.userId
            const himchistkaId = req.body.himchistkaId
            const himservicesId = req.body.himservicesId
            const newOrder = await OrderService.createOrder(userId, himservicesId, himchistkaId)
            return res.status(200).json({
                success: true,
                date: newOrder,
            })
        } catch (e) {
            next(e)
        }
    }

    async removeOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = req.body.orderId
            const OrderTRM = await OrderService.removeOrder(orderId)
            return OrderTRM
        } catch (e) {
            next(e)
        }
    }
    async updateOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = req.body.orderId
            const status = req.body.status
            const order = await OrderService.updateOrder(orderId, status)
            return order
        } catch (e) {
            next(e)
        }
    }
}
export default new OrderController()