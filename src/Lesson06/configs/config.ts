import dotenv from "dotenv";

dotenv.config();

interface Config {
    MONGO_URI: string;
    PORT: string;

    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_LIFETIME: any;
    JWT_REFRESH_LIFETIME: any;

    JWT_ACTIVATION_SECRET: string;
    JWT_ACTIVATION_LIFETIME: any;

    JWT_RECOVERY_SECRET: string;
    JWT_RECOVERY_LIFETIME: any;

    EMAIL_USER: string;
    EMAIL_PASSWORD: string;

    FRONTEND_URL: string;

    DEFAULT_EMAIL: string;
}

const config: Config = {
    MONGO_URI: process.env.MONGO_URI ?? "",
    PORT: process.env.PORT ?? "0000",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ?? "",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? "",
    JWT_ACCESS_LIFETIME: process.env.JWT_ACCESS_LIFETIME ?? "",
    JWT_REFRESH_LIFETIME: process.env.JWT_REFRESH_LIFETIME ?? "",
    JWT_ACTIVATION_SECRET: process.env.JWT_ACTIVATION_SECRET ?? "",
    JWT_ACTIVATION_LIFETIME: process.env.JWT_ACTIVATION_LIFETIME ?? "",
    JWT_RECOVERY_SECRET: process.env.JWT_RECOVERY_SECRET ?? "",
    JWT_RECOVERY_LIFETIME: process.env.JWT_RECOVERY_LIFETIME ?? "",
    EMAIL_USER: process.env.EMAIL_USER ?? "",
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ?? "",
    FRONTEND_URL: process.env.FRONTEND_URL ?? "",
    DEFAULT_EMAIL: process.env.DEFAULT_EMAIL ?? "" // In production messages would be sent to users email, but for testing purposes I'm using my own email
};

export default config;
