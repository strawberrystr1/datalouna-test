import pgClient from "../../clients/pg";
import { IProductModel } from "../../types/models/produc";

export const getProductQuery = (id: string) => pgClient<IProductModel[]>`
  select
    *
  from
    products
  where
    id = ${id}
`;
