import { Application, Request, Response } from "express"
import { RouteConfig } from "../../abstracts/route.config"
import himchistkaController from "./himchistka.controller"
export class HimchistkaRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "HimchistkaRoutes")
    }
    // TODO change paths and controllers of get/delete/edit to include himchistka name in it
    configureRoutes(): Application {
        this.app.route("/himchistka/all").get(himchistkaController.getAll)
        this.app.route("/himchistka/new").post(himchistkaController.createHimchistka)
        this.app.route("/himchistka/delete").delete(himchistkaController.removeHimchistka)
        this.app.route("/himchistka/patch").patch(himchistkaController.updateHimchistka)
        this.app.route("/himchistka/:id").get(himchistkaController.getHimchistkaById)
        return this.app
    }
}