import pgClient from "../../clients/pg";
import { ISignUpPayload } from "../../types/auth";
import { IUserModel } from "../../types/models/user";

export const createUserMutation = (
  data: ISignUpPayload & { balance: number }
) => {
  const insertKeys = Object.keys(data) as (keyof ISignUpPayload)[];
  return pgClient<Pick<IUserModel, "id">[]>`
    insert into users ${pgClient(data, ...insertKeys)}
    returning id
  `;
};
