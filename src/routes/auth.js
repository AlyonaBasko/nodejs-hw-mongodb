import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema, loginUserSchema } from "../validation/authSchemas.js";
import { handleRegister, handleLogin, handleRefresh, logoutUserController } from "../controllers/auth.js";
import { authenticate } from "../middlewares/authenticate.js";
import contactsRouter from "./contacts.js";

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
  ctrlWrapper(handleRefresh)
);

router.post(
  "/logout",
  ctrlWrapper(logoutUserController)
);

router.use("/contacts", authenticate, contactsRouter);

export default router;
