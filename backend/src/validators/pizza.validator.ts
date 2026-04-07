import joi from "joi";

export class PizzaValidator {
    private static readonly pizzaName = joi.string().min(3).max(75).trim();
    private static readonly price = joi.number().min(0.99);
    private static readonly size = joi.number().integer();

    public static readonly checkPizza = joi.object({
        name: this.pizzaName.required(),
        price: this.price.required(),
        size: this.size.required()
    });
}
