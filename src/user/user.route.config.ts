import express, { Application, Request, Response } from "express"
import { RouteConfig } from "../abstracts/route.config"
import UserController from "./user.controller"
import JWT from "../middlewares/JWT"

export class UserRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "UserRoutes")
    }
    configureRoutes() {
        this.app.route(`/users`).get([JWT.authenticateJWT, UserController.getUsers])
        return this.app
    }
}