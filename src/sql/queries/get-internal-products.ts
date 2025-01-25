import pgClient from "../../clients/pg";
import { IProductModel } from "../../types/models/produc";

export const getInternalProductsQuery = () => pgClient<IProductModel[]>`
  select
    *
  from
    products
`;
