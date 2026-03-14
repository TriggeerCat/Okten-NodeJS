import { NextFunction, Request, Response } from "express";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { Auth } from "../interfaces/auth.interface";
import { TokenPayload } from "../interfaces/token.interface";
import { UserCreateDTO } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";

class AuthController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as UserCreateDTO;
            const data = await authService.signUp(body);
            res.status(StatusCodeEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as Auth;
            const data = await authService.signIn(dto);
            res.status(StatusCodeEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, role } = res.locals.tokenPayload as TokenPayload;
            const tokens = tokenService.generateTokens({ userId, role });
            await tokenService.create({ ...tokens, _userId: userId });
            res.status(StatusCodeEnum.OK).json(tokens);
        } catch (e) {
            next(e);
        }
    }

    public async me(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.tokenPayload as TokenPayload;
            const user = await userService.getById(userId);
            res.status(StatusCodeEnum.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
