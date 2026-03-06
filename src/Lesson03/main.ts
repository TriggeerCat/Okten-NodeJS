import express from "express";
import * as mongoose from "mongoose";
import config from "./configs/config";
import { apiRouter } from "./routes/api.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", apiRouter);

const dbConnection = async () => {
    let dbCon = false;

    while (!dbCon) {
        try {
            console.log("Connecting to database");
            await mongoose.connect(config.MONGO_URI);
            dbCon = true;
            console.log("Connection successful");
        } catch (e) {
            console.log("Connection failed. Trying to reconnect in 3 seconds. Error:", e);
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};

const start = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, () => {
            console.log("Merry Christmas!");
        });
    } catch (e) {
        console.log(e);
    }
};

start().then();
