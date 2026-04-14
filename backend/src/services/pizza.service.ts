import { FilterQuery, SortOrder } from "mongoose";

import { Pizza, PizzaDTO, PizzaQuery } from "../interfaces/pizza.interface";
import { pizzaModel } from "../models/pizza.model";

class PizzaService {
    public async getAll(query: PizzaQuery) {
        const filter: FilterQuery<Pizza> = {};
        if (query.search) {
            filter.$or = [{ name: { $regex: query.search, $options: "i" } }];
        }

        const sortOrder: Record<string, SortOrder> = {};
        if (query.order) {
            if (query.order.startsWith("-")) {
                sortOrder[query.order.slice(1)] = "desc";
            } else {
                sortOrder[query.order] = "asc";
            }
        }

        const data = await pizzaModel
            .find(filter)
            .limit(query.pageSize)
            .skip(query.pageSize * (query.page - 1))
            .sort(sortOrder);

        const totalItems = await pizzaModel.countDocuments(filter);
        const totalPages = Math.ceil(totalItems / query.pageSize);

        return {
            data,
            totalItems,
            totalPages,
            prevPage: query.page > 1,
            nextPage: query.page < totalPages
        };
    }

    public create(pizza: PizzaDTO) {
        return pizzaModel.create(pizza);
    }
}

export const pizzaService = new PizzaService();
