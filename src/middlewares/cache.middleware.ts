import { NextFunction, Request, Response } from "express";
import redisClient from "../clients/redis";
import { returnResponse } from "../utils/response";

export const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.path;

  const cached = await redisClient.get(key);

  if (cached) {
    returnResponse(res, true, JSON.parse(cached));
  } else {
    next();
  }
};
