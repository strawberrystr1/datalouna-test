import { Nullable } from "../base";

export interface IUserModel {
  id: string;
  email: string;
  name: string;
  surname: string;
  balance: number;
  password: string;
  refresh_token: string;
  created_at: string;
  updated_at: string;
}

export type User = Omit<IUserModel, "created_at" | "updated_at">;

export type UserMutableFields = Omit<User, "id">;

export type UserUpdateValues = Nullable<Partial<UserMutableFields>>;

export type UserUpdateKeys = keyof UserMutableFields;

export interface IUserUpdateResult {
  id: string;
  balance: string;
  name: string;
}
