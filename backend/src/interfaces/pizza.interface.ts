export interface Pizza {
    _id: number;
    name: string;
    price: number;
    size: number;
}

export interface PizzaQuery {
    pageSize: number;
    page: number;
    search?: string;
    order?: string;
}

export type PizzaDTO = Pick<Pizza, "name" | "price" | "size">;
