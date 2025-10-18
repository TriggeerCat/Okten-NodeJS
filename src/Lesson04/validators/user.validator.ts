import joi from "joi";

export class UserValidator {
    private static name = joi.string().min(3).max(10).required();
    private static funFact = joi
        .string()
        .regex(/^.{2,100}$/)
        .required();

    public static create = joi.object({
        name: this.name,
        funFact: this.funFact,
    });

    public static update = joi.object({
        name: this.name,
        funFact: this.funFact,
    });
}
