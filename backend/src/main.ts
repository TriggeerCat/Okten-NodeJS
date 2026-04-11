import path from "node:path";

import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import config from "./configs/config";
import { ApiError } from "./errors/api.error";
import { apiRouter } from "./routes/api.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", apiRouter);

app.use("/", (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({ status, message });
});

app.use("/media", express.static(path.join(process.cwd(), "upload")));

process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception", error);
    process.exit(1);
});

const dbConnection = async () => {
    while (true) {
        try {
            console.log("Connecting to database");
            await mongoose.connect(config.MONGO_URI);
            console.log("Connection successful");
            break;
        } catch {
            console.log("Connection failed. Trying to reconnect in 3 seconds.");
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
