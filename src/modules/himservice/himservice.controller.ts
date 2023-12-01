import { Request, Response, NextFunction } from "express"
import HimserviceService from "./himservice.service";
import IHimservice from './himservice.interface'

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

    async getServiceById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const himservice = await HimserviceService.getById(id)
            if(himservice) {
                return res.status(200).json({
                    success: true,
                    data: himservice
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

    async createHimservice(req: Request, res: Response, next: NextFunction) {

        try {
            const name = req.body.name
            const cost = req.body.cost
            const newHimservice = await HimserviceService.createHimservice(name, cost)
            return res.status(200).json({
                success: true,
                data: newHimservice,
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

    async updateHimservice(req: Request, res: Response, next: NextFunction){
        try{
            const himservieId = req.body.id;
            const newHimservice: IHimservice = {
                cost: req.body.cost,
            }
            const updatedHimservice = await HimserviceService.editHimservice(himservieId, newHimservice)
            return res.status(200).json({
                success: true,
                updatedHimservice,
        })
        }catch(e){
            next(e)
        }
    }
}
export default new HimserviceController()