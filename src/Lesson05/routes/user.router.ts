import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", commonMiddleware.isIdValid("id"), userController.getOne);
// router.post("/", commonMiddleware.validateBody(UserValidator.create), userController.create);
router.put(
    "/:id",
    commonMiddleware.isIdValid("id"),
    commonMiddleware.validateBody(UserValidator.update),
    userController.update
);
router.delete("/:id", commonMiddleware.isIdValid("id"), userController.delete);

export const userRouter = router;
