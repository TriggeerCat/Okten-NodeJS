import jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { STATUS_CODE } from "../enums/status.code.enum";
import { ApiError } from "../errors/api.error";
import { TokenPair, TokenPayload } from "../interfaces/token.interface";
import { tokenRepository } from "../repositories/token.repository";

class TokenService {
    public generateTokens(payload: TokenPayload): TokenPair {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
            expiresIn: config.JWT_ACCESS_LIFETIME,
        });

        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_LIFETIME,
        });

        return { accessToken, refreshToken };
    }

    public verifyToken(token: string, type: "access" | "refresh") {
        let secret: string;

        switch (type) {
            case "access":
                secret = config.JWT_ACCESS_SECRET;
                break;
            case "refresh":
                secret = config.JWT_REFRESH_SECRET;
                break;
            default:
                throw new ApiError("Invalid token type", STATUS_CODE.BAD_REQUEST);
        }

        return jwt.verify(token, secret) as TokenPayload;
    }

    public async isTokenExists(accessToken: string) {
        const token = await tokenRepository.findByParams({ accessToken });
        return !!token;
    }
}

export const tokenService = new TokenService();
