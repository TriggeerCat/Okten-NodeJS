import joi from "joi";

import { PIZZA_QUERY_ORDER } from "../enums/pizza-query-order.enum";

export class QueryValidator {
    private static readonly pageSize = joi.number().min(1).max(20);
    private static readonly page = joi.number().min(1);
    private static readonly search = joi.string().trim();
    private static readonly order = joi
        .string()
        .valid(...Object.values(PIZZA_QUERY_ORDER), ...Object.values(PIZZA_QUERY_ORDER).map((value) => `-${value}`));

    public static readonly query = joi.object({
        pageSize: this.pageSize.default(10),
        page: this.page.default(1),
        search: this.search,
        order: this.order
    });
}
