import dotenv from "dotenv";

dotenv.config({path:  '.env'})

const config = {
    PORT: process.env.PORT ? process.env.PORT : '5555',
    MONGO_URI: process.env.MONGO_URI ? process.env.MONGO_URI : 'undefined'
}

export {config}