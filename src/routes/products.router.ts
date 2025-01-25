import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { cacheMiddleware } from "../middlewares/cache.middleware";
import {
  getInternalProductsController,
  getProductsController,
  purchaseProductContoller
} from "../controllers/products.controller";

const productsRouter = Router();

productsRouter.get("/", authMiddleware, cacheMiddleware, getProductsController);
productsRouter.post("/:id", authMiddleware, purchaseProductContoller);
productsRouter.get("/internal", authMiddleware, getInternalProductsController);

export default productsRouter;
