import { Application, Request, Response } from "express"
import { RouteConfig } from "../../abstracts/route.config"
import OrderController from "./order.controller"
export class OrderRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "OrderRoutes")
    }
    configureRoutes(): Application {
        this.app.route("/order/all").get(OrderController.getAll)
        this.app.route("/order/new").post(OrderController.createOrder)
        this.app.route("/order/delete").delete(OrderController.removeOrder)
        this.app.route("/order/update").patch(OrderController.updateOrder)
        return this.app
    }
}