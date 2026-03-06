import dotenv from "dotenv";

dotenv.config({ path: ".env" });

interface Config {
    PORT: string;
    MONGO_URI: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_LIFETIME: any;
    JWT_REFRESH_LIFETIME: any;
}

const config: Config = {
    PORT: process.env.PORT ? process.env.PORT : "5555",
    MONGO_URI: process.env.MONGO_URI ? process.env.MONGO_URI : "undefined",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ? process.env.JWT_ACCESS_SECRET : "0",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ? process.env.JWT_REFRESH_SECRET : "0",
    JWT_ACCESS_LIFETIME: process.env.JWT_ACCESS_LIFETIME ? process.env.JWT_ACCESS_LIFETIME : "10m",
    JWT_REFRESH_LIFETIME: process.env.JWT_REFRESH_LIFETIME ? process.env.JWT_REFRESH_LIFETIME : "20m",
};

export { config };
