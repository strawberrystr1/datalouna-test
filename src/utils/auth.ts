import { Response } from "express";
import {
  ACCESS_TOKEN_LIVE_TIME,
  REFRESH_TOKEN_LIVE_TIME
} from "../constants/auth";
import { encryptString } from "./crypto";

export const generateTokens = (id: string) => {
  const accessExpiration = Date.now() + ACCESS_TOKEN_LIVE_TIME;
  const refreshExpiration = Date.now() + REFRESH_TOKEN_LIVE_TIME;

  return {
    accessToken: encryptString(
      JSON.stringify({ id, expiration: accessExpiration })
    ),
    refreshToken: encryptString(
      JSON.stringify({ id, expiration: refreshExpiration })
    ),
    accessExpiration,
    refreshExpiration
  };
};

export const setTokenCookie = (
  res: Response,
  tokenData: Pick<
    ReturnType<typeof generateTokens>,
    "accessToken" | "accessExpiration"
  >
) => {
  res.cookie("token", tokenData.accessToken, {
    maxAge: REFRESH_TOKEN_LIVE_TIME,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development"
  });
};
