import { create } from "zustand";

type UnSavedAlternativeQuantityState = {
  sku: string[];
  actions: {
    pushSku: (sku: string) => void;
    popSku: (skus: string[]) => void;
  };
};

const useUnSavedAlternativeQuantityState =
  create<UnSavedAlternativeQuantityState>()((set) => ({
    sku: [],
    actions: {
      pushSku: (sku) =>
        set((state) => {
          if (!state.sku.includes(sku)) {
            return {
              sku: [...state.sku, sku],
            };
          }

          return state;
        }),
      popSku: (skus) =>
        set((state) => {
          const newSkuArray = state.sku.filter((item) => !skus.includes(item));

          return {
            sku: newSkuArray,
          };
        }),
    },
  }));

export default useUnSavedAlternativeQuantityState;
