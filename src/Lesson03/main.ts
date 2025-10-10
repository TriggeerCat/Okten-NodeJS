import express from 'express';
import * as mongoose from "mongoose";
import {config} from "./configs/config";
import {apiRouter} from "./routes/api.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', apiRouter);

const connectToDb = async () => {
    let isConnected: boolean = false;

    while (!isConnected) {
        try {
            await mongoose.connect(config.MONGO_URI);
            isConnected = true;
            console.log('Database connection is successful');
        } catch (e) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            console.log('Database connection failed, waiting 3 seconds');
        }
    }
}

const start = async () => {
    try {
        await connectToDb();
        app.listen(config.PORT, () => {
            console.log(`Server listening on ${config.PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start().then();