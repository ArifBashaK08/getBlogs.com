import { connect } from "mongoose"

const ConnectMongoDB = (url) => {
    connect(url)
        .then(() => console.log("Server connected to MongoDB"))
        .catch(err => console.error("MongoDB refused to connect", err?.message))
}

export default ConnectMongoDB