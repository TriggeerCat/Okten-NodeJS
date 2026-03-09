import { Request, Response } from "express";

import { STATUS_CODE } from "../enums/status.code.enum";
import { UserCreateDTO, UserUpdateDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAll(req: Request, res: Response) {
        const data = await userService.getAll();
        res.status(STATUS_CODE.OK).json(data);
    }

    public async getById(req: Request, res: Response) {
        const { id } = req.params;
        const data = await userService.getById(id);
        res.status(STATUS_CODE.OK).json(data);
    }

    public async updateById(req: Request, res: Response) {
        const { id } = req.params;
        const user: UserUpdateDTO = req.body;
        const data = await userService.updateById(id, user);
        res.status(STATUS_CODE.OK).json(data);
    }

    public async deleteById(req: Request, res: Response) {
        const { id } = req.params;
        const data = await userService.deleteById(id);
        res.status(STATUS_CODE.NO_CONTENT).json(data);
    }
}

export const userController = new UserController();
