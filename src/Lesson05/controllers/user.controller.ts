import { Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserCreateDTO, UserUpdateDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAll(req: Request, res: Response) {
        const users = await userService.getAll();
        res.status(StatusCodesEnum.OK).json(users);
    }

    public async getOne(req: Request, res: Response) {
        const user = await userService.getById(req.params.id);
        res.status(StatusCodesEnum.OK).json(user ?? {});
    }

    public async create(req: Request, res: Response) {
        const user = req.body as UserCreateDTO;
        const newUser = await userService.create(user);
        res.status(StatusCodesEnum.CREATED).json(newUser);
    }

    public async update(req: Request, res: Response) {
        const user = req.body as UserUpdateDTO;
        const updatedUser = await userService.update(req.params.id, user);
        res.status(StatusCodesEnum.OK).json(updatedUser);
    }

    public async delete(req: Request, res: Response) {
        await userService.delete(req.params.id);
        res.status(StatusCodesEnum.NO_CONTENT).end();
    }
}

export const userController = new UserController();
