import jwt from "jsonwebtoken";

import config from "../configs/config";
import { StatusCodeEnum } from "../enums/status-code.enum";
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

    public generateTokens(payload: TokenPayload): TokenPair {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
            expiresIn: config.JWT_ACCESS_LIFETIME
        });

        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_LIFETIME
        });

        return { accessToken, refreshToken };
    }

    public verifyToken(token: string, type: "access" | "refresh"): TokenPayload {
        switch (type) {
            case "access": {
                const secret = config.JWT_ACCESS_SECRET;
                return jwt.verify(token, secret) as TokenPayload;
            }
            case "refresh": {
                const secret = config.JWT_REFRESH_SECRET;
                return jwt.verify(token, secret) as TokenPayload;
            }
            default:
                throw new ApiError("Invalid token type", StatusCodeEnum.BAD_REQUEST);
        }
    }

    public async doesTokenExist(token: string, type: "access" | "refresh") {
        switch (type) {
            case "access": {
                return !!(await this.findByParams({ accessToken: token }));
            }
            case "refresh":
                return !!(await this.findByParams({ refreshToken: token }));
            default:
                throw new ApiError("Invalid token type", StatusCodeEnum.BAD_REQUEST);
        }
    }
}

export const tokenService = new TokenService();
