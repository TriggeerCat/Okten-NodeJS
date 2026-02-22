import { NextFunction, Request, Response } from "express";

import { STATUS_CODE } from "../enums/status.code.enum";
import { ApiError } from "../errors/api.error";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
    public async checkAccessToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader) next(new ApiError("No token provided", STATUS_CODE.UNAUTHORIZED));
        else {
            const accessToken = authHeader.split(" ")[1];
            const tokenPayload = tokenService.verifyToken(accessToken, "access");
            const isTokenExists = await tokenService.isTokenExists(accessToken);
            if (!isTokenExists) throw new ApiError("This token does not exists", STATUS_CODE.BAD_REQUEST);
            if (req.res) req.res.locals.tokenPayload = tokenPayload;
            next();
        }
    }

    public async checkRefreshToken() {
        return;
    }
}

export const authMiddleware = new AuthMiddleware();
