import { create } from "zustand";

type CartState = {
  excludedSkus: string[];
  discontinuedSkus: string[];
  actions: {
    setExcludedSkus: (skus: string[]) => void;
    setDiscontinuedSkus: (skus: string[]) => void;
  };
};

const useCartStore = create<CartState>()((set) => ({
  excludedSkus: [],
  discontinuedSkus: [],
  actions: {
    setExcludedSkus: (skus) =>
      set({
        excludedSkus: skus,
      }),
    setDiscontinuedSkus: (skus) =>
      set({
        discontinuedSkus: skus,
      }),
  },
}));

export default useCartStore;
