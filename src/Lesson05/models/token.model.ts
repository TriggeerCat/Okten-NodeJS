import { model, Schema } from "mongoose";

import { Token } from "../interfaces/token.interface";

const tokenSchema = new Schema(
    {
        accessToken: { type: String, required: true },
        refreshToken: { type: String, required: true },
        _userId: { type: String, required: true }
    },
    { timestamps: true, versionKey: false }
);

export const TokenModel = model<Token>("tokens", tokenSchema);
