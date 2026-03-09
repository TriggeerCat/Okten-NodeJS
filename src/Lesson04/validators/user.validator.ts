import joi from "joi";

export class UserValidator {
    private static readonly name = joi.string().min(3).max(10).required();
    private static readonly email = joi
        .string()
        .regex(/^((?!\.)[\w\-.]*[^.])(@\w+)(\.\w+(\.\w+)?\w)$/)
        .required();

    public static readonly create = joi.object({
        name: this.name,
        email: this.email
    });

    public static readonly update = joi.object({
        name: this.name,
        email: this.email
    });
}
