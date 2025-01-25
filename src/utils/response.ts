import { Response } from "express";
import { IError } from "../types/base";

export const returnResponse = (
  res: Response,
  success: boolean,
  data?: Record<string, unknown>,
  status = 200
) =>
  res.status(status).json({
    success,
    error: !success,
    data
  });

export const handleAsyncError = (error: unknown, res: Response) => {
  try {
    if (error instanceof Error) {
      const { message, code } = JSON.parse(error.message) as IError;
      returnResponse(res, false, { message }, code);
    } else {
      returnResponse(res, false, { message: "Something went wrong" }, 500);
    }
  } catch (err) {
    returnResponse(res, false, { message: "Something went wrong" }, 500);
  }
}