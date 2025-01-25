import { NextFunction, Request, Response } from "express";
import { decryptToken } from "../utils/crypto";
import pgClient from "../clients/pg";
import { User } from "../types/models/user";
import { ITokenPayload } from "../types/auth";
import {
  ACCESS_TOKEN_LIVE_TIME,
  REFRESH_TOKEN_LIVE_TIME
} from "../constants/auth";
import { generateTokens, setTokenCookie } from "../utils/auth";
import { updateUserMutation } from "../sql/mutations/update-user.mutation";
import { getUserQuery } from "../sql/queries/get-user.query";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) {
    next({ message: "Unauthorized", code: 401 });
  }

  const { expiration, id } = JSON.parse(decryptToken(token)) as ITokenPayload;

  const [user] = await pgClient<User[]>`${getUserQuery("id", id)}`;

  if (!user) {
    next({ message: "User not found", code: 404 });
  }

  if (Date.now() - expiration > ACCESS_TOKEN_LIVE_TIME) {
    if (user.refresh_token) {
      const { expiration: refreshExpiration } = JSON.parse(
        decryptToken(user.refresh_token)
      );

      if (Date.now() - refreshExpiration > REFRESH_TOKEN_LIVE_TIME) {
        next({ message: "Unauthorized", code: 401 });
      } else {
        const newTokens = generateTokens(id);

        setTokenCookie(res, newTokens);

        await pgClient`${updateUserMutation(id, {
          refresh_token: newTokens.refreshToken
        })}`;

        Object.assign(req, { user });
        next();
      }
    } else {
      next({ message: "Unauthorized", code: 401 });
    }
  }

  Object.assign(req, { user });
  next();
};
