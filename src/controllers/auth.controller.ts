import { Request, Response } from "express";
import {
  IChangePassPayload,
  ILoginPayload,
  ISignUpPayload,
  RequestWithUser
} from "../types/auth";
import {
  changePassword,
  loginUser,
  signOut,
  signUpUser
} from "../services/auth.service";
import { setTokenCookie } from "../utils/auth";
import { handleAsyncError, returnResponse } from "../utils/response";

export const signUpController = async (
  req: Request<never, never, ISignUpPayload>,
  res: Response
) => {
  try {
    const tokens = await signUpUser(req.body);
    setTokenCookie(res, tokens);
    returnResponse(res, true, {}, 201);
  } catch (error) {
    handleAsyncError(error, res);
  }
};

export const loginController = async (
  req: Request<never, never, ILoginPayload>,
  res: Response
) => {
  try {
    const tokens = await loginUser(req.body);
    setTokenCookie(res, tokens);
    returnResponse(res, true);
  } catch (error) {
    handleAsyncError(error, res);
  }
};

export const changePasswordController = async (
  req: Request<never, never, IChangePassPayload>,
  res: Response
) => {
  try {
    await changePassword(req.body);
    returnResponse(res, true);
  } catch (error) {
    handleAsyncError(error, res);
  }
};

export const signOutController = async (
  req: RequestWithUser,
  res: Response
) => {
  await signOut(req.user!.id);
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development"
  });
  returnResponse(res, true);
};
