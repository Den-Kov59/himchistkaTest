import { Application, Request, Response } from "express"
import { RouteConfig } from "../../abstracts/route.config"
import HimserviceController from "./himservice.controller"
export class HimserviceRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "HimserviceRoutes")
    }
    // TODO change paths and controllers of get/delete/edit to include himservice name in it
    configureRoutes(): Application {
        this.app.route("/himservices/all").get(HimserviceController.getAll)
        this.app.route("/himservices/new").post(HimserviceController.createHimservice)
        this.app.route("/himservices/delete").delete(HimserviceController.removeHimservice)
        this.app.route("/himservices/edit").patch(HimserviceController.updateHimservice)
        this.app.route("/himservices/:id").get(HimserviceController.getServiceById)
        return this.app
    }
}