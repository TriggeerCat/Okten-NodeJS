import { Request, Response } from "express";

import { STATUS_CODES } from "../enums/status.codes";
import { UserDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAll(req: Request, res: Response) {
        const data = await userService.getAll();
        res.status(STATUS_CODES.OK).json(data);
    }

    public async getById(req: Request, res: Response) {
        const { id } = req.params;
        const data = await userService.getById(id);
        res.status(STATUS_CODES.OK).json(data);
    }

    public async create(req: Request, res: Response) {
        const user: UserDTO = req.body;
        const data = await userService.create(user);
        res.status(STATUS_CODES.CREATED).json(data);
    }

    public async updateById(req: Request, res: Response) {
        const { id } = req.params;
        const user: UserDTO = req.body;
        const data = await userService.updateById(id, user);
        res.status(STATUS_CODES.OK).json(data);
    }

    public async deleteById(req: Request, res: Response) {
        const { id } = req.params;
        const data = await userService.deleteById(id);
        res.status(STATUS_CODES.NO_CONTENT).json(data);
    }
}

export const userController = new UserController();
