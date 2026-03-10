import { Router } from "express";

import { commonMiddleware } from "../middlewares/common.middleware";
import { authService } from "../services/auth.service";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post("/sign-up", commonMiddleware.validateBody(UserValidator.create), authService.signUp);
router.post("/sign-in", authService.signIn);

export const authRouter = router;
