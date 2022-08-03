import { Application, Request, Response } from "express"
import { RouteConfig } from "../abstracts/route.config"
import himchistkaController from "./himchistka.controller"
export class HimchistkaRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "HimchistkaRoutes")
    }
    configureRoutes(): Application {
        this.app.route("/getHimchistkas").get(himchistkaController.getAll)
        this.app.route("/createHimchistka").post(himchistkaController.createHimchistka)
        this.app.route("/deleteHimchistka").delete(himchistkaController.removeHimchistka)
        return this.app
    }
}