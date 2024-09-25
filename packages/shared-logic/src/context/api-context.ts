import { type KyInstance } from "ky";
import { createContext, useContext } from "react";

export const ApiContext = createContext<KyInstance | null>(null);

export const useApiContext = () => {
  const api = useContext(ApiContext);

  if (!api) {
    throw new Error("No 'ky' instance given through API provider");
  }

  return api;
};
