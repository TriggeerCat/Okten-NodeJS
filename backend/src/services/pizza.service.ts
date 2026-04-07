import { PizzaDTO } from "../interfaces/pizza.interface";
import { pizzaModel } from "../models/pizza.model";

class PizzaService {
    public getAll() {
        return pizzaModel.find();
    }
    public create(pizza: PizzaDTO) {
        return pizzaModel.create(pizza);
    }
}

export const pizzaService = new PizzaService();
