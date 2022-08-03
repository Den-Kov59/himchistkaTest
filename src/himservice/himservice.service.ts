import Himservice from './himservice.model'
import debug from 'debug';

class HimserviceService {
    async getAll() {
        return Himservice.find({})
    }
    async createHimservice(name: string, cost: number) {
        const newHimservice = new Himservice({ name, cost })
        return newHimservice.save(function (err) {
            if (err) return debug.log(err)
        })
    }
    async removeHimservice(name: string) {
        const himservice = Himservice.findOneAndRemove({ name }).then((himservice) => {
            if (!himservice) {
                debug.log("himservice not found");
            } else {
                return himservice;
            }
        })
    }

}
export default new HimserviceService()