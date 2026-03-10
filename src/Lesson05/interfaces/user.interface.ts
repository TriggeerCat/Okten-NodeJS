import { RolesEnum } from "../enums/roles.enum";
import { Base } from "./base.interface";

export interface User extends Base {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: RolesEnum;
    isDeleted: boolean;
    isVerified: boolean;
    isActive: boolean;
}

export type UserCreateDTO = Pick<User, "name" | "email" | "password">;
export type UserUpdateDTO = Pick<User, "name">;
