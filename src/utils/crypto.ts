import { createCipheriv, createDecipheriv } from "crypto";
import { CRYPTO_IV, CRYPTO_SECRET } from "../constants/crypto";

const ALGORITHM = "aes-256-cbc";

export const encryptString = (value: string) => {
  const cipher = createCipheriv(ALGORITHM, CRYPTO_SECRET, CRYPTO_IV);
  let encrypted = cipher.update(value, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
};

export const decryptToken = (value: string) => {
  const decipher = createDecipheriv(ALGORITHM, CRYPTO_SECRET, CRYPTO_IV);
  let decrypted = decipher.update(value, "hex", "utf8");
  decrypted += decipher.final("utf8");
  
  return decrypted;
};
