import { NextFunction, Request, Response } from "express";

import { STATUS_CODE } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { RefreshToken } from "../interfaces/token.interface";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
    public async checkAccessToken(req: Request, res: Response, next: NextFunction) {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            next(new ApiError("No auth header provided", STATUS_CODE.UNAUTHORIZED));
            return;
        }
        const accessToken = authorizationHeader?.split(" ")[1];
        if (!accessToken) {
            next(new ApiError("No token provided", STATUS_CODE.UNAUTHORIZED));
            return;
        }
        const tokenPayload = tokenService.verifyToken(accessToken ?? " ", "access");
        if (!(await tokenService.doesTokenExist(accessToken, "access"))) {
            next(new ApiError("Invalid token provided", STATUS_CODE.UNAUTHORIZED));
            return;
        }
        if (res.locals) res.locals.tokenPayload = tokenPayload;
        next();
    }

    public async checkRefreshToken(req: Request, res: Response, next: NextFunction) {
        const { refreshToken } = req.body as RefreshToken;
        if (!refreshToken) {
            next(new ApiError("No token provided", STATUS_CODE.FORBIDDEN));
            return;
        }
        const tokenPayload = tokenService.verifyToken(refreshToken, "refresh");
        if (!(await tokenService.doesTokenExist(refreshToken, "refresh"))) {
            next(new ApiError("Invalid token provided", STATUS_CODE.FORBIDDEN));
            return;
        }
        if (req.res?.locals) req.res.locals.tokenPayload = tokenPayload;
        next();
    }
}

export const authMiddleware = new AuthMiddleware();
