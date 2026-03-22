import { NextFunction, Request, Response } from "express";

import { STATUS_CODE } from "../enums/status-code.enum";
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
            res.status(STATUS_CODE.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as Auth;
            const data = await authService.signIn(dto);
            res.status(STATUS_CODE.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, role } = res.locals.tokenPayload as TokenPayload;
            const tokens = tokenService.generateAuthTokens({ userId, role });
            await tokenService.create({ ...tokens, _userId: userId });
            res.status(STATUS_CODE.OK).json(tokens);
        } catch (e) {
            next(e);
        }
    }

    public async me(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.tokenPayload as TokenPayload;
            const user = await userService.getById(userId);
            res.status(STATUS_CODE.OK).json(user);
        } catch (e) {
            next(e);
        }
    }

    public async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const { activationToken } = req.params;
            const user = await authService.activate(activationToken);
            res.status(STATUS_CODE.OK).json(user);
        } catch (e) {
            next(e);
        }
    }

    public async requestRecovery(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const user = await authService.requestRecovery(email);
            res.status(STATUS_CODE.OK).json(user);
        } catch (e) {
            next(e);
        }
    }

    public async recover(req: Request, res: Response, next: NextFunction) {
        try {
            const { recoveryToken } = req.params;
            const { password } = req.body;
            const user = await authService.recover(recoveryToken, password);
            res.status(STATUS_CODE.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
