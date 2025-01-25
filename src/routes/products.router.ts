import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { cacheMiddleware } from "../middlewares/cache.middleware";
import {
  getProductsController,
  purchaseProductContoller
} from "../controllers/products.controller";

const productsRouter = Router();

productsRouter.get("/", authMiddleware, cacheMiddleware, getProductsController);
productsRouter.post("/:id", authMiddleware, purchaseProductContoller);

export default productsRouter;
