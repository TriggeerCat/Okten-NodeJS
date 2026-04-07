import joi from "joi";

export class FormValidator {
    private static readonly email = joi.string().email().trim();
    private static readonly password = joi
        .string()
        .regex(/(?=.*[\w\s:])(\S){8,16}$/)
        .trim();

    public static readonly checkForm = joi.object({
        email: this.email.required(),
        password: this.password.required()
    });
}
