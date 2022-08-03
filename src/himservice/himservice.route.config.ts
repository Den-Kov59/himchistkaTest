import { Application, Request, Response } from "express"
import { RouteConfig } from "../abstracts/route.config"
import HimserviceController from "./himservice.controller"
export class HimserviceRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "HimserviceRoutes")
    }
    configureRoutes(): Application {
        this.app.route("/getHimservices").get(HimserviceController.getAll)
        this.app.route("/createHimservice").post(HimserviceController.createHimservice)
        this.app.route("/deleteHimcservice").delete(HimserviceController.removeHimservice)
        return this.app
    }
}