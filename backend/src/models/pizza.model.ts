import { model, Schema } from "mongoose";

import { Pizza } from "../interfaces/pizza.interface";

const pizzaSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: Number, required: true }
    },
    { timestamps: false, versionKey: false }
);

export const pizzaModel = model<Pizza>("pizza", pizzaSchema);
