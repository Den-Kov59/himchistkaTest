import { Application, Request, Response } from "express"
import { RouteConfig } from "../abstracts/route.config"
import OrderController from "./order.controller"
export class OrderRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "OrderRoutes")
    }
    configureRoutes(): Application {
        this.app.route("/getOrders").get(OrderController.getAll)
        this.app.route("/createOrder").post(OrderController.createOrder)
        this.app.route("/deleteOrder").delete(OrderController.removeOrder)
        this.app.route("/updateOrder").patch(OrderController.updateOrder)
        return this.app
    }
}