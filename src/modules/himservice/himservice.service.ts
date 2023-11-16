import Himservice from './himservice.model'
import debug from 'debug';
import IHimservice from './himservice.interface'

class HimserviceService {
    async getAll() {
        return Himservice.find({})
    }
    async createHimservice(name: string, cost: number) {
        const newHimservice = new Himservice({ name, cost })
        return newHimservice.save((err) => {
            if (err) return debug.log(err)
        })
    }
    async removeHimservice(name: string) {
        const himservice = Himservice.findOneAndRemove({ name }).then((himservices) => {
            if (!himservices) {
                debug.log("himservice not found");
            } else {
                return himservices;
            }
        })
    }

    async editHimservice(id: string, himservice: IHimservice){
        const newHimservice = Himservice.updateOne({_id : id}, {...himservice}).then((himservices)=>{
            if (!himservices) {
                debug.log("himservice not found");
            } else {
                return himservices;
            }
        })
    }

}
export default new HimserviceService()