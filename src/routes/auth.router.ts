import { Router } from "express";
import {
  changePasswordController,
  loginController,
  signOutController,
  signUpController
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/sign-up", signUpController);
authRouter.post("/sign-out", authMiddleware, signOutController);
authRouter.post("/login", loginController);
authRouter.post("/change-password", changePasswordController);

export default authRouter;
