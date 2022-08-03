import Himchistka from './himchistka.model'
import debug from 'debug';

class HimchistkaService {
    async getAll() {
        return Himchistka.find({})
    }
    async createHimchistka(name: string, address: string) {
        const newHimchistka = new Himchistka({ name, address })
        return newHimchistka.save(function (err) {
            if (err) return debug.log(err)
        })
    }
    async removeHimchistka(name: string) {
        const himchistka = Himchistka.findOneAndRemove({ name }).then((himchistka) => {
            if (!himchistka) {
                debug.log("himchistka not found");
            } else {
                return himchistka;
            }
        })
    }

}
export default new HimchistkaService()