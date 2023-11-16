import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { RouteConfig } from './abstracts/route.config'
import { UserRoutes } from './modules/user/user.route.config'
import { IUser } from "./modules/user/user.interface";
import { AuthRoutes } from "./modules/auth/auth.route.config"
import { IDebugger } from 'debug';
import { HimchistkaRoutes } from "./modules/himchistka/himchistka.route.config"
import debug from 'debug';
import cors from 'cors'
import { HimserviceRoutes } from "./modules/himservice/himservice.route.config"
import { OrderRoutes } from "./modules/order/order.route.config"

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
routes.push(new OrderRoutes(app))

app.get('/', (req: Request, res: Response) => {
    res.send("Express+ Typescript server is running")
})

app.listen(port, () => {
    debugLog(`[server]: Server is running at https://localhost:${port}`);
    routes.forEach((route: RouteConfig) => {
        debugLog(`Routes configured for ${route.getName()}`)
    })
})