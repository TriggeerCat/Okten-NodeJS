import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { ActivityValidator } from "../validators/activity.validator";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", commonMiddleware.validateId, userController.getOne);
router.put(
    "/body/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.validateId,
    commonMiddleware.validateRoleFromToken("admin"),
    commonMiddleware.validateBody(UserValidator.updateUser),
    userController.updateUser
);
router.put(
    "/activity/:id",
    authMiddleware.checkAccessToken,
    commonMiddleware.validateRoleFromToken("admin"),
    commonMiddleware.validateBody(ActivityValidator.checkActivity),
    userController.updateActiveStatus
);
router.delete("/:id", authMiddleware.checkAccessToken, commonMiddleware.validateId, userController.delete);

export const userRouter = router;
