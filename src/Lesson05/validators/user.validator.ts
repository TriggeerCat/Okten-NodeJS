import joi from "joi";

export class UserValidator {
    private static readonly name = joi.string().min(3).max(10).trim().required();
    private static readonly email = joi.string().email().trim().required();
    private static readonly password = joi
        .string()
        .regex(/(?=.*[\w\s:])(\S){8,16}$/)
        .trim()
        .required();

    public static readonly create = joi.object({
        name: this.name,
        email: this.email,
        password: this.password
    });

    public static readonly update = joi.object({
        name: this.name,
        email: this.email,
        password: this.password
    });
}
