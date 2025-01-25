export interface IError extends Error {
  message: string;
  code: number;
}

export type Nullable<T> = { [K in keyof T]: T[K] | null };
