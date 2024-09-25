import { create } from "zustand";

type CartPageState = {
  /**
   * This state is used to force re-rendering the CartItem component
   * after selecting a global shipping method.
   */
  cartItemKey: number;
  actions: {
    incrementCartItemKey: () => void;
  };
};

const useCartPageStore = create<CartPageState>()((set) => ({
  cartItemKey: 0,
  actions: {
    incrementCartItemKey: () =>
      set((state) => ({ cartItemKey: state.cartItemKey + 1 })),
  },
}));

export default useCartPageStore;
