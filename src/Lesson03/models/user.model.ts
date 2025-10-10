import {Schema, model} from 'mongoose';
import {User} from "../interfaces/user.interface";

const userSchema = new Schema(
    {
        name: {type: String, required: true},
        funFact: {type: String, required: false}
    },
    {timestamps: true, versionKey: false}
);

export const UserModel = model<User>("user", userSchema);