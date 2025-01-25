import pgClient from "../../clients/pg";
import {
  IUserUpdateResult,
  UserUpdateKeys,
  UserUpdateValues
} from "../../types/models/user";

export const updateUserMutation = (id: string, values: UserUpdateValues) => {
  const updateKeys = Object.keys(values) as UserUpdateKeys[];

  return pgClient<IUserUpdateResult[]>`
    update users
    set ${pgClient(values, ...updateKeys)}
    where id = ${id}
    returning balance, id, name
  `;
};
