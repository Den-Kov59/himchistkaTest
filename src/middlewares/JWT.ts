import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const JWT_KEY = process.env.JWT_SECRET || "123456";
import debug, { IDebugger } from "debug";

const log: IDebugger = debug("middleware:JWT");

class JWT {
    authenticateJWT(req: Request, res: Response, next: NextFunction) {
        // Bearer token
        const authHeader = req.headers.authorization.split(' ')[1];
        if (authHeader && authHeader !== "null") {
            // const token = authHeader.split(" ")[1];
            log("auth Header", JWT_KEY);
            jwt.verify(authHeader, JWT_KEY, (err: any, user: any) => {
                if (err) {
                    log("Error", err);
                    return res
                        .status(403)
                        .send({ success: false, message: "Token Expired" });
                }
                req.user = user;
                next();
            });
        } else {
            res.status(403).json({ success: false, message: "UnAuthorized" });
        }
    }
}

export default new JWT();