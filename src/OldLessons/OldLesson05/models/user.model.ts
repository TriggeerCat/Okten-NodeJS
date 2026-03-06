import { model, Schema } from "mongoose";

import { ROLE } from "../enums/role.enum";
import { User } from "../interfaces/user.interface";

const userSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        funFact: { type: String, required: true },
        role: { enum: ROLE, type: String, required: true, default: ROLE.USER },
        isDeleted: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
        isActive: { type: Boolean, default: false }, // HW
    },
    { timestamps: true, versionKey: false },
);

export const UserModel = model<User>("user", userSchema);
