import { NextFunction, Request, Response } from "express";

import { StatusCodeEnum } from "../enums/status-code.enum";
import { UserUpdateDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAll();
            res.status(StatusCodeEnum.OK).json(users);
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getById(req.params.id);
            res.status(StatusCodeEnum.OK).json(user ?? { status: "User not found" });
        } catch (e) {
            next(e);
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as UserUpdateDTO;
            const updatedUser = await userService.updateUser(req.params.id, user);
            res.status(StatusCodeEnum.OK).json(updatedUser);
        } catch (e) {
            next(e);
        }
    }

    public async updateActiveStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const isActive = req.body.isActive as boolean;
            const updatedUser = await userService.updateActiveStatus(req.params.id, isActive);
            res.status(StatusCodeEnum.OK).json(updatedUser);
        } catch (e) {
            next(e);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await userService.delete(req.params.id);
            res.status(StatusCodeEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
