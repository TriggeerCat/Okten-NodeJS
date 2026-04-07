export interface Pizza {
    _id: number;
    name: string;
    price: number;
    size: number;
}

export type PizzaDTO = Pick<Pizza, "name" | "price" | "size">;
