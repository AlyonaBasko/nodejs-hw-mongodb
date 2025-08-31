import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import { registerUserSchema, loginUserSchema } from "../validation/authSchemas.js";
import { handleRegister, handleLogin, handleRefresh, logoutController } from "../controllers/auth.js";

const router = Router();

router.post(
  "/register",
  validateBody(registerUserSchema),
  ctrlWrapper(handleRegister)
);

router.post(
  "/login",
  validateBody(loginUserSchema),
  ctrlWrapper(handleLogin)
);

router.post(
  "/refresh",
  authenticate,
  ctrlWrapper(handleRefresh)
);

router.post(
  "/logout",
  authenticate,
  logoutController);

export default router;
