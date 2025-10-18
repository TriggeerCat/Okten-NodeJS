import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { config } from "./configs/config";
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

process.on("uncaughtException", (err) => {
    console.log(err);
    process.exit(1);
});

const connectToDb = async () => {
    let isConnected: boolean = false;

    while (!isConnected) {
        try {
            await mongoose.connect(config.MONGO_URI);
            isConnected = true;
            console.log("Database connection is successful");
        } catch (e) {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            console.log("Database connection failed, waiting 3 seconds\n", e);
        }
    }
};

const start = async () => {
    try {
        await connectToDb();
        app.listen(config.PORT, () => {
            console.log(`Server listening on ${config.PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start().then();
