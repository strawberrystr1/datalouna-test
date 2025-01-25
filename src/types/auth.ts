import { Request } from "express";
import { User } from "./models/user";

export interface ITokenPayload {
  expiration: number;
  id: string;
}

export interface ISignUpPayload {
  email: string;
  password: string;
  name: string;
  surname?: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IChangePassPayload {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export type RequestWithUser<
  P = any,
  B = any,
  D = any,
  Q = qs.ParsedQs,
  L extends Record<string, any> = Record<string, any>
> = Request<P, B, D, Q, L> & { user?: User };
