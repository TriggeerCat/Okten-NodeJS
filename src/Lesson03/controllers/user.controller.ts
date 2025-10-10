import {Request, Response} from "express";
import {userService} from "../services/user.service";
import {UserDTO} from "../interfaces/user.interface";
import {statusCodes} from "../enums/statusCodes";

class UserController {
    public async getAll(req: Request, res: Response) {
        const data = await userService.getAll();
        res.status(statusCodes.OK).json(data);
    }

    public async getById(req: Request, res: Response) {
        const {id} = req.params;
        const data = await userService.getById(id);
        res.status(statusCodes.OK).json(data);
    }

    public async create(req: Request, res: Response) {
        const user: UserDTO = req.body;
        const data = await userService.create(user);
        res.status(statusCodes.CREATED).json(data);
    }

    public async updateById(req: Request, res: Response) {
        const {id} = req.params;
        const user: UserDTO = req.body;
        const data = await userService.updateById(id, user);
        res.status(statusCodes.OK).json(data);
    }

    public async deleteById(req: Request, res: Response) {
        const {id} = req.params;
        const data = await userService.deleteById(id);
        res.status(statusCodes.NO_CONTENT).json(data);
    }
}

export const userController = new UserController();