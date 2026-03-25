import jwt from "jsonwebtoken";

import { STATUS_CODE } from "../enums/status-code.enum";
import { ActionTokens, AuthTokens, getLifetimeByTokenType, getSecretByTokenType } from "../enums/token.enum";
import { ApiError } from "../errors/api.error";
import { TokenPair, TokenPayload, Tokens, TokensDTO } from "../interfaces/token.interface";
import { TokenModel } from "../models/token.model";

class TokenService {
    public create(dto: TokensDTO) {
        return TokenModel.create(dto);
    }

    public findByParams(params: Partial<Tokens>) {
        return TokenModel.findOne(params);
    }

    public generateAuthTokens(payload: TokenPayload): TokenPair {
        const accessToken = jwt.sign(payload, getSecretByTokenType("access"), {
            expiresIn: getLifetimeByTokenType("access")
        });
        const refreshToken = jwt.sign(payload, getSecretByTokenType("refresh"), {
            expiresIn: getLifetimeByTokenType("refresh")
        });

        return { accessToken, refreshToken };
    }

    public generateActionToken(payload: TokenPayload, type: ActionTokens) {
        try {
            return jwt.sign(payload, getSecretByTokenType(type), { expiresIn: getLifetimeByTokenType(type) });
        } catch {
            throw new ApiError("Invalid token type", STATUS_CODE.BAD_REQUEST);
        }
    }

    public verifyToken(token: string, type: AuthTokens | ActionTokens): TokenPayload {
        try {
            return jwt.verify(token, getSecretByTokenType(type)) as TokenPayload;
        } catch (e) {
            throw new ApiError(e?.toString() ?? "", STATUS_CODE.BAD_REQUEST);
        }
    }

    public async doesTokenExist(token: string, type: AuthTokens) {
        switch (type) {
            case "access":
                return !!(await this.findByParams({ accessToken: token }));
            case "refresh":
                return !!(await this.findByParams({ refreshToken: token }));
            default:
                throw new ApiError("Invalid token type", STATUS_CODE.BAD_REQUEST);
        }
    }
}

export const tokenService = new TokenService();
