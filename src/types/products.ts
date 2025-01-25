export enum Currency {
  AUD,
  BRL,
  CAD,
  CHF,
  CNY,
  CZK,
  DKK,
  EUR,
  GBP,
  HRK,
  NOK,
  PLN,
  RUB,
  SEK,
  TRY,
  USD
}

export interface ISkinResponse {
  market_hash_name: string;
  currency: Currency;
  suggested_price: number;
  item_page: string;
  market_page: string;
  min_price: number;
  max_price: number;
  mean_price: number;
  median_price: number;
  quantity: number;
  created_at: number;
  updated_at: number;
}
