import { Role } from "../enums/role.enum";
import { Base } from "./base.interface";

interface Token extends Base {
    _id: string;
    accessToken: string;
    refreshToken: string;
    _userId: string;
}

interface TokenPayload {
    userId: string;
    role: Role;
}

type TokenPair = Pick<Token, "accessToken" | "refreshToken">;

export { Token, TokenPair, TokenPayload };
