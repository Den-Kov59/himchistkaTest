import { Request, Response, NextFunction } from "express"
import HimchistkaService from "./himchistka.service";

class HimchistkaController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const himchistkas = await HimchistkaService.getAll();

            return res.status(200).json({
                success: true,
                data: himchistkas,
            });
        } catch (e) {
            next(e);
        }
    }

    async createHimchistka(req: Request, res: Response, next: NextFunction) {

        try {
            const name = req.body.name
            const address = req.body.address
            const newHimchistka = await HimchistkaService.createHimchistka(name, address)
            return res.status(200).json({
                success: true,
                date: newHimchistka,
            })
        } catch (e) {
            next(e)
        }
    }

    async removeHimchistka(req: Request, res: Response, next: NextFunction) {
        try {
            const name = req.body.name
            const himchistkaTRM = await HimchistkaService.removeHimchistka(name)
            return himchistkaTRM
        } catch (e) {
            next(e)
        }
    }
}
export default new HimchistkaController()