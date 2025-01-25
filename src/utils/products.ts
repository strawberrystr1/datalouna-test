import { ISkinResponse } from "../types/products";

export const mapAPIProducts = (
  all: ISkinResponse[],
  tradable: ISkinResponse[]
) => {
  return all.map(def => ({
    minPrice: def.min_price,
    tradableMinPrice: tradable.find(el => el.item_page === def.item_page)
      ?.min_price
  }));
};
