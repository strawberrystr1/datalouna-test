import pgClient from "../clients/pg";
import { PASS_SALT_ROUNDS } from "../constants/crypto";
import { createUserMutation } from "../sql/mutations/create-user.mutation";
import { getUserQuery } from "../sql/queries/get-user.query";
import {
  IChangePassPayload,
  ILoginPayload,
  ISignUpPayload
} from "../types/auth";
import bcrypt from "bcryptjs";
import { generateTokens } from "../utils/auth";
import { updateUserMutation } from "../sql/mutations/update-user.mutation";
import { throwError } from "../utils/base";

export const signUpUser = async (data: ISignUpPayload) => {
  const existedUser = await getUser("email", data.email, true);

  if (existedUser) {
    throwError(409, "User with provided email already exists");
  }

  const hashedPassword = bcrypt.hashSync(data.password, PASS_SALT_ROUNDS);
  const [userId] = await createUserMutation({
    ...data,
    password: hashedPassword,
    balance: 40.00
  });

  const tokens = generateTokens(userId.id);

  updateUserMutation(userId.id, {
    refresh_token: tokens.refreshToken
  });

  return tokens;
};

export const loginUser = async (data: ILoginPayload) => {
  const user = await getUser("email", data.email);
  checkPassword(data.password, user.password);
  const tokens = generateTokens(user.id);
  await updateUserMutation(user.id, { refresh_token: tokens.refreshToken });
  return tokens;
};

export const changePassword = async (data: IChangePassPayload) => {
  const user = await getUser("email", data.email);
  checkPassword(data.oldPassword, user.password);
  const newPassword = bcrypt.hashSync(data.newPassword, PASS_SALT_ROUNDS);

  return pgClient`${updateUserMutation(user.id, { password: newPassword })}`;
};

export const signOut = async (id: string) => {
  await updateUserMutation(id, { refresh_token: null });
};

export const getUser = async (
  field: "email" | "id",
  value: string,
  skipValidation = false
) => {
  const [user] = await getUserQuery(field, value);

  if (!user && !skipValidation) {
    throwError(404, "User with provided data not found");
  }

  return user;
};

const checkPassword = (pass: string, hash: string) => {
  const isPasswordCorrect = bcrypt.compareSync(pass, hash);

  if (!isPasswordCorrect) {
    throwError(400, "Wrong password");
  }
};
