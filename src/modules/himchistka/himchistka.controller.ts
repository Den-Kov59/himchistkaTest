import { Request, Response, NextFunction } from "express"
import HimchistkaService from "./himchistka.service";
import IHimchistka from "./himchistka.interface";
import IChangeHimchistka from "./himchistka.interface";

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

    async getHimchistkaById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const himchistka = await HimchistkaService.getById(id)
            if(himchistka) {
                return res.status(200).json({
                    success: true,
                    data: himchistka
                })
            } else {
                return res.status(200).json({
                    success: false
                })
            }
        } catch (e) {
            next(e)
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

    async updateHimchistka(req: Request, res: Response, next: NextFunction) {
        try
        {
            const himchistkaId = req.body.id;
            const newHimchistka: IChangeHimchistka = {
                name: req.body.name,
                address: req.body.address,
                description: req.body.description,
                himservices: req.body.himservices,
                images: req.body.images
            }
            const updatedHimchistka = await HimchistkaService.updateHimchistka(himchistkaId, newHimchistka)
            return res.status(200).json({
                success: true,
                updatedHimchistka,
        })
        }catch(e){
            next(e)
        }
    }
}
export default new HimchistkaController()