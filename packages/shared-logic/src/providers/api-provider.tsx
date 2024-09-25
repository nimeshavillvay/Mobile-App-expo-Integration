import { type KyInstance } from "ky";
import { type ReactNode } from "react";
import { ApiContext } from "../context/api-context";

type ApiProviderProps = {
  /**
   * An instance of [ky](https://github.com/sindresorhus/ky) created with the
   * [`create` function](https://github.com/sindresorhus/ky?tab=readme-ov-file#kycreatedefaultoptions)
   */
  readonly kyInstance: KyInstance;
  readonly children: ReactNode;
};

const ApiProvider = ({ kyInstance, children }: ApiProviderProps) => {
  return (
    <ApiContext.Provider value={kyInstance}>{children}</ApiContext.Provider>
  );
};

export default ApiProvider;
