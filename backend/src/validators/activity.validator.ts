import joi from "joi";

export class ActivityValidator {
    private static readonly isActive = joi.boolean();

    public static readonly checkActivity = joi.object({
        isActive: this.isActive.required()
    });
}
