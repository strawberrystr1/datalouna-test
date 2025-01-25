import { Request, Response } from "express";
import { handleAsyncError, returnResponse } from "../utils/response";
import { buyProduct, getProducts } from "../services/products.service";
import { RequestWithUser } from "../types/auth";

export const getProductsController = async (req: Request, res: Response) => {
  try {
    const data = await getProducts(req.path);
    returnResponse(res, true, data);
  } catch (error) {
    handleAsyncError(error, res);
  }
};

export const purchaseProductContoller = async (
  req: RequestWithUser<{ id: string }>,
  res: Response
) => {
  try {
    const balance = await buyProduct(req.user!.id, req.params.id);
    returnResponse(res, true, { balance });
  } catch (error) {
    handleAsyncError(error, res);
  }
};
