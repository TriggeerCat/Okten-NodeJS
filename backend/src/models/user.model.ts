import path from "node:path";

import { model, Schema } from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { User } from "../interfaces/user.interface";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { enum: RoleEnum, type: String, required: true, default: RoleEnum.USER },
        pfp: { type: String, default: "" },
        isDeleted: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
        isActive: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: (doc, ret) => {
                ret.password = "[********]";
                if (ret.pfp) {
                    ret.pfp = `/media/${path.basename(ret.pfp)}`;
                }
                return ret;
            }
        }
    }
);

export const UserModel = model<User>("user", userSchema);
