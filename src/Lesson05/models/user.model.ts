import { model, Schema } from "mongoose";

import { RolesEnum } from "../enums/roles.enum";
import { User } from "../interfaces/user.interface";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { enum: RolesEnum, type: String, required: true, default: RolesEnum.USER },
        isDeleted: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true, versionKey: false }
);

export const UserModel = model<User>("user", userSchema);
