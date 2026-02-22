import joi from "joi";

export class UserValidator {
    private static email = joi
        .string()
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .trim()
        .required();
    private static password = joi.string().regex(/^.{4,16}$/);
    private static name = joi.string().min(3).max(10).required();
    private static funFact = joi
        .string()
        .regex(/^.{2,100}$/)
        .required();

    public static create = joi.object({
        name: this.name,
        funFact: this.funFact,
        email: this.email,
        password: this.password,
    });

    public static update = joi.object({
        name: this.name,
        funFact: this.funFact,
    });
}
