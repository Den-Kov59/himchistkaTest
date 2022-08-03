import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { RouteConfig } from './abstracts/route.config'
import { UserRoutes } from './user/user.route.config'
import { IUser } from "./User/user.interface";
import { AuthRoutes } from "./auth/auth.route.config"
import { IDebugger } from 'debug';
import { HimchistkaRoutes } from "./himchistka/himchistka.route.config"
import debug from 'debug';
import cors from 'cors'
import { HimserviceRoutes } from "./himservice/himservice.route.config"

dotenv.config()

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

const app: Express = express()
const port = process.env.PORT

app.use(express.json());
app.use(cors());

const debugLog: IDebugger = debug("app");

const routes: RouteConfig[] = []

routes.push(new UserRoutes(app))
routes.push(new AuthRoutes(app))
routes.push(new HimchistkaRoutes(app))
routes.push(new HimserviceRoutes(app))

app.get('/', (req: Request, res: Response) => {
    res.send("Express+ Typescript server is running")
})

app.listen(port, () => {
    debugLog(`[server]: Server is running at https://localhost:${port}`);
    routes.forEach((route: RouteConfig) => {
        debugLog(`Routes configured for ${route.getName()}`)
    })
})