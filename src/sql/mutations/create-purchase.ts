import pgClient from "../../clients/pg";

export const createPurchaseMutation = (
  user: string,
  product: string
) => pgClient`
  insert into purchases
    (user_id, product_id)
  values
    (${user}, ${product})
`;
