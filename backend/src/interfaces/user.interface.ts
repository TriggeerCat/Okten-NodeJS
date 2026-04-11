import { RoleEnum } from "../enums/role.enum";
import { Base } from "./base.interface";

export interface User extends Base {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: RoleEnum;
    pfp: string;
    isDeleted: boolean;
    isVerified: boolean;
    isActive: boolean;
}

export type UserCreateDTO = Pick<User, "name" | "email" | "password">;
export type UserUpdateDTO = Pick<User, "name">;
