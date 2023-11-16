import mongoose from "mongoose"
import debug, { IDebugger } from "debug"

const log: IDebugger = debug("app:mongoose-service")

class MongooseService {
    private count = 0
    private mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 5000,
        useFindAndModify: false,
    }
    constructor() {
        this.connectWithRetry()
    }
    getInstance() {
        return mongoose
    }
    connectWithRetry() {
        console.log("process.env.DB_CONN_STRING", process.env.DB_CONN_STRING)
        const MONGODB_URI = process.env.DB_CONN_STRING || ""
        console.log("Connecting to MongoDB(Retry when failed)")
        mongoose
            .connect(MONGODB_URI, this.mongooseOptions)
            .then(() => {
                console.log("MongoDB is connected")
            })
            .catch(err => {
                const retrySeconds = 5
                console.log(
                    `MongoDB connection unsuccessful (will retry #${++this
                        .count} after ${retrySeconds} seconds):`,
                    err
                )
                setTimeout(this.connectWithRetry, retrySeconds * 1000)
            })
    }
}
export default new MongooseService()