import { Application, Request, Response } from "express"
import { RouteConfig } from "../../abstracts/route.config"
import AuthController from "./auth.controller"
export class AuthRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "AuthRoutes")
    }
    configureRoutes() {
        this.app.route("/login").post(AuthController.login)
        this.app.route("/signup").post(AuthController.signup)
        this.app.route("/passchange").patch(AuthController.changePassword)
        return this.app
    }
}