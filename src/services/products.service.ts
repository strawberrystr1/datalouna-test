import axios from "axios";
import { SKINPORT_BASE_URL } from "../constants/api";
import redisClient from "../clients/redis";
import { ISkinResponse } from "../types/products";
import { getProductQuery } from "../sql/queries/get-product.query";
import { throwError } from "../utils/base";
import { getUser } from "./auth.service";
import { createPurchaseMutation } from "../sql/mutations/create-purchase";
import { updateUserMutation } from "../sql/mutations/update-user.mutation";
import { CACHE_TIME } from "../constants/base";
import { mapAPIProducts } from "../utils/products";

export const getProducts = async (path: string) => {
  const query = new URLSearchParams({
    tradable: String(true)
  });
  const [{ data }, { data: tradable }] = await Promise.all(
    [
      `${SKINPORT_BASE_URL}/items`,
      `${SKINPORT_BASE_URL}/items?${query.toString()}`
    ].map(url =>
      axios.get<ISkinResponse[]>(url, {
        method: "GET",
        headers: {
          "Accept-Encoding": "br"
        }
      })
    )
  );

  const response = {
    data: mapAPIProducts(data, tradable)
  };

  await redisClient.set(path, JSON.stringify(response), {
    EX: CACHE_TIME
  });

  return response;
};

export const buyProduct = async (userId: string, productId: string) => {
  const user = await getUser("id", userId);
  const product = await getProduct(productId);

  if (+product.price > +user.balance) {
    throwError(404, "Insufficient funds on balance");
  }

  await createPurchaseMutation(userId, productId);
  const [updatedUser] = await updateUserMutation(userId, { balance: +user.balance - +product.price });

  return updatedUser.balance;
};

const getProduct = async (id: string) => {
  const [product] = await getProductQuery(id);

  if (!product) {
    throwError(404, "Product with provided id not found");
  }

  return product;
};
