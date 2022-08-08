import express, { Application, Request, Response } from "express"
import { RouteConfig } from "../../abstracts/route.config"
import UserController from "./user.controller"
import JWT from "../../middlewares/JWT"

export class UserRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "UserRoutes")
    }
    configureRoutes() {
        this.app.route(`/user/all`).get([JWT.authenticateJWT, UserController.getUsers])
        this.app.route('/user/:email').get(UserController.getUser)
        this.app.route('/user/delete').delete(UserController.deleteUser)
        return this.app
    }
}