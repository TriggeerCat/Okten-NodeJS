import { NextFunction, Request, Response } from "express";

import { STATUS_CODE } from "../enums/status-code.enum";
import { PizzaDTO, PizzaQuery } from "../interfaces/pizza.interface";
import { pizzaService } from "../services/pizza.service";

class PizzaController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const pizzaListData = await pizzaService.getAll((req as any).validQuery as PizzaQuery);
            res.status(STATUS_CODE.OK).json(pizzaListData);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const pizza = await pizzaService.create(req.body as PizzaDTO);
            res.status(STATUS_CODE.OK).json(pizza);
        } catch (e) {
            next(e);
        }
    }
}

export const pizzaController = new PizzaController();
