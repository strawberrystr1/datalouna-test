import { NextFunction, Request, Response } from "express";
import { handleAsyncError, returnResponse } from "../utils/response";

export const errorsMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    if ("message" in err && "code" in err) {
      returnResponse(res, false, { message: err.message }, err.code as number);
    } else {
      handleAsyncError(err, res);
    }
  } else {
    next();
  }
};
