import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import config from "./configs/config";
import { ApiError } from "./errors/api.error";
import { apiRouter } from "./routes/api.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", apiRouter);

app.use("/", (err: ApiError, req: Request, res: Response) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({ status, message });
});

process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception", error);
    process.exit(1);
});

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
