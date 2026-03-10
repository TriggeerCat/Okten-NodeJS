import { RolesEnum } from "../enums/roles.enum";
import { Base } from "./base.interface";

export interface Token extends Base {
    _id: string;
    accessToken: string;
    refreshToken: string;
    _userId: string;
}

export interface TokenPayload {
    userId: string;
    role: RolesEnum;
}

export type TokenPair = Pick<Token, "accessToken" | "refreshToken">;
