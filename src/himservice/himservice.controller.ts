import { Request, Response, NextFunction } from "express"
import HimserviceService from "./himservice.service";

class HimserviceController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const himservices = await HimserviceService.getAll();

            return res.status(200).json({
                success: true,
                data: himservices,
            });
        } catch (e) {
            next(e);
        }
    }

    async createHimservice(req: Request, res: Response, next: NextFunction) {

        try {
            const name = req.body.name
            const cost = req.body.cost
            const newHimservice = await HimserviceService.createHimservice(name, cost)
            return res.status(200).json({
                success: true,
                date: newHimservice,
            })
        } catch (e) {
            next(e)
        }
    }

    async removeHimservice(req: Request, res: Response, next: NextFunction) {
        try {
            const name = req.body.name
            const himserviceTRM = await HimserviceService.removeHimservice(name)
            return himserviceTRM
        } catch (e) {
            next(e)
        }
    }
}
export default new HimserviceController()