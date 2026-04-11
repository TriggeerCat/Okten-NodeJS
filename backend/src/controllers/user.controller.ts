import { NextFunction, Request, Response } from "express";

import { STATUS_CODE } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { TokenPayload } from "../interfaces/token.interface";
import { UserUpdateDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAll();
            res.status(STATUS_CODE.OK).json(users);
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getById(req.params.id as string);
            res.status(STATUS_CODE.OK).json(user ?? { status: "User not found" });
        } catch (e) {
            next(e);
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as UserUpdateDTO;
            const updatedUser = await userService.updateById(req.params.id as string, user);
            res.status(STATUS_CODE.OK).json(updatedUser);
        } catch (e) {
            next(e);
        }
    }

    public async updateActiveStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const isActive = req.body.isActive as boolean;
            const updatedUser = await userService.updateById(req.params.id as string, { isActive });
            res.status(STATUS_CODE.OK).json(updatedUser);
        } catch (e) {
            next(e);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await userService.delete(req.params.id as string);
            res.status(STATUS_CODE.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }

    public async uploadPfp(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.tokenPayload as TokenPayload;

            if (!req.file) next(new ApiError("No file uploaded", STATUS_CODE.BAD_REQUEST));
            const updatedUser = await userService.updateById(userId, { pfp: req.file?.path ?? "" });

            res.status(STATUS_CODE.OK).json(updatedUser);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
