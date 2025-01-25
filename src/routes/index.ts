import { Router } from "express";
import authRouter from "./auth.router";
import productsRouter from "./products.router";

const router = Router();

router.use(authRouter);
router.use("/products", productsRouter);

export default router;
