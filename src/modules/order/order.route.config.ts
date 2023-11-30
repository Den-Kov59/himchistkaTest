import { Application, Request, Response } from "express"
import { RouteConfig } from "../../abstracts/route.config"
import OrderController from "./order.controller"
export class OrderRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "OrderRoutes")
    }
    // TODO change paths and controllers of get/delete/edit to include orderID in it
    configureRoutes(): Application {
        this.app.route("/order/all").get(OrderController.getAll)
        this.app.route("/order/new").post(OrderController.createOrder)
        this.app.route("/order/delete").delete(OrderController.removeOrder)
        this.app.route("/order/update").patch(OrderController.updateOrder)
        this.app.route("/order/:id").get(OrderController.getOrderById)
        return this.app
    }
}