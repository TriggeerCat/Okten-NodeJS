import jwt from "jsonwebtoken";
import { Token } from "path-to-regexp";

import config from "../configs/config";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { TokenPayload } from "../interfaces/token.interface";
import { TokenModel } from "../models/token.model";

class TokenService {
    public create(dto: any) {
        return TokenModel.create(dto);
    }

    public findByParams(params: Partial<Token>) {
        return TokenModel.findOne(params);
    }

    public generateTokens(payload: TokenPayload) {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
            expiresIn: config.JWT_ACCESS_LIFETIME
        });

        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_LIFETIME
        });

        return { accessToken, refreshToken };
    }

    public verifyToken(token: string, type: "access" | "refresh"): TokenPayload {
        let secret: string;
        switch (type) {
            case "access":
                secret = config.JWT_ACCESS_SECRET;
                break;
            case "refresh":
                secret = config.JWT_REFRESH_SECRET;
                break;
            default:
                throw new ApiError("Invalid token type", StatusCodesEnum.BAD_REQUEST);
        }
        return jwt.verify(token, secret) as TokenPayload;
    }
}

export const tokenService = new TokenService();
