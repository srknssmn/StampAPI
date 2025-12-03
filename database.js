import mongoose from "mongoose";
const ConnectionURL = process.env.CONNECTION_URL

const database = () => {
    try {
        mongoose.connect(ConnectionURL, ({
            useNewUrlParser: true,
            useUnifiedTopology: true
        })).then (() => {
            console.log("mongoDB connected")
        })
    } catch (error) {
        console.log(error)
    }
}

export default database;