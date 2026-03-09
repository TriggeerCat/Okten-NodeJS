import { Request, Response } from "express";

import { EnumStatusCodes } from "../enums/enum.status-codes";
import { UserDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAll(req: Request, res: Response) {
        const users = await userService.getAll();
        res.status(EnumStatusCodes.OK).json(users);
    }

    public async getOne(req: Request, res: Response) {
        const user = await userService.getById(req.params.id);
        res.status(EnumStatusCodes.OK).json(user ?? {});
    }

    public async create(req: Request, res: Response) {
        const user = req.body as UserDTO;
        const newUser = await userService.create(user);
        res.status(EnumStatusCodes.CREATED).json(newUser);
    }

    public async update(req: Request, res: Response) {
        const user = req.body as UserDTO;
        const updatedUser = await userService.update(req.params.id, user);
        res.status(EnumStatusCodes.OK).json(updatedUser);
    }

    public async delete(req: Request, res: Response) {
        await userService.delete(req.params.id);
        res.status(EnumStatusCodes.NO_CONTENT).end();
    }
}

export const userController = new UserController();
