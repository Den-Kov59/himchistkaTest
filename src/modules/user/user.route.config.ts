import express, { Application, Request, Response } from "express"
import { RouteConfig } from "../../abstracts/route.config"
import UserController from "./user.controller"
import JWT from "../../middlewares/JWT"
export class UserRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "UserRoutes")
    }
    // TODO change paths and controllers of get/delete/edit to include username in it
    configureRoutes() {
        this.app.route(`/user/all`).get([JWT.authenticateJWT, UserController.getUsers])
        this.app.route('/user/:email').get(UserController.getUser)
        this.app.route('/user/delete').delete(UserController.deleteUser)
        this.app.route('/user/edit').patch(UserController.editUsers)
        return this.app
    }
}