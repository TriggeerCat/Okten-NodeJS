import {RoleEnum} from "../enums/role.enum";

export interface User {
    _id: string;
    name: string;
    email: string;
    role: RoleEnum;
    isDeleted: boolean;
    isVerified: boolean;
    isActive: boolean;
}
