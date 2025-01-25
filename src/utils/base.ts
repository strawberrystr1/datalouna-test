export const throwError = (code: number, message: string) => {
  throw new Error(
    JSON.stringify({
      code,
      message
    })
  );
};
