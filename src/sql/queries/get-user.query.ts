import pgClient from "../../clients/pg";
import { User, UserUpdateKeys } from "../../types/models/user";

export const getUserQuery = (
  field: UserUpdateKeys | "id",
  value: string
) => pgClient<User[]>`
  select
    id, name, surname, balance, password, refresh_token, email
  from
    users
  where
    ${pgClient(field)} = ${value}
`;
