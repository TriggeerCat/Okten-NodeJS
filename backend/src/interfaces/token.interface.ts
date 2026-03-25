import { RoleEnum } from "../enums/role.enum";
import { Base } from "./base.interface";

export interface Tokens extends Base {
    _id: string;
    accessToken: string;
    refreshToken: string;
    _userId: string;
}

export interface TokenPayload {
    userId: string;
    role: RoleEnum;
}

export type TokensDTO = Pick<Tokens, "accessToken" | "refreshToken" | "_userId">;
export type TokenPair = Pick<Tokens, "accessToken" | "refreshToken">;
export type RefreshToken = Pick<Tokens, "refreshToken">;
