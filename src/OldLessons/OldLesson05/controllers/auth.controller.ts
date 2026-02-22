import { NextFunction, Request, Response } from "express";

import { STATUS_CODE } from "../enums/status.code.enum";
import { Auth } from "../interfaces/auth.interface";
import { authService } from "../services/auth.service";

class AuthController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body;
            const data = await authService.signUp(user);
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
}

export const authController = new AuthController();
