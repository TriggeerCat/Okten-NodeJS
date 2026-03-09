import { model, Schema } from "mongoose";

import { User } from "../interfaces/user.interface";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true }
    },
    { timestamps: true, versionKey: false }
);

export const UserModel = model<User>("user", userSchema);
