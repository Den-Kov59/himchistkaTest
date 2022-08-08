import { Application, Request, Response } from "express"
import { RouteConfig } from "../../abstracts/route.config"
import HimserviceController from "./himservice.controller"
export class HimserviceRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "HimserviceRoutes")
    }
    configureRoutes(): Application {
        this.app.route("/himservices/all").get(HimserviceController.getAll)
        this.app.route("/himservices/new").post(HimserviceController.createHimservice)
        this.app.route("/himservices/delete").delete(HimserviceController.removeHimservice)
        return this.app
    }
}