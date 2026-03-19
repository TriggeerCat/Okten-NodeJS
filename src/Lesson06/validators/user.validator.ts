import joi from "joi";

export class UserValidator {
    private static readonly name = joi.string().min(3).max(10).trim();
    private static readonly email = joi.string().email().trim();
    private static readonly password = joi
        .string()
        .regex(/(?=.*[\w\s:])(\S){8,16}$/)
        .trim();

    public static readonly createUser = joi.object({
        name: this.name.required(),
        email: this.email.required(),
        password: this.password.required()
    });

    public static readonly updateUser = joi.object({
        name: this.name.required(),
        email: this.email.required()
    });
}
