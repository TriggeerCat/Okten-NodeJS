import { Router } from "express";

import { pizzaController } from "../controllers/pizza.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { PizzaValidator } from "../validators/pizza.validator";

const router = Router();

router.get("/", pizzaController.getAll);
router.post("/", commonMiddleware.validateBody(PizzaValidator.checkPizza), pizzaController.create);

export const pizzaRouter = router;
