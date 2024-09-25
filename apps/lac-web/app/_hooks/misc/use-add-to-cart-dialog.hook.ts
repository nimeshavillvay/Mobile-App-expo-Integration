import { create } from "zustand";

type DialogOpenState = "closed" | "verification" | "confirmation";

type AddToCartDialogState = {
  open: DialogOpenState;
  productId?: number;
  quantity?: number;
  actions: {
    setOpen: (open: DialogOpenState) => void;
    setProductId: (productId?: number) => void;
    setQuantity: (quantity?: number) => void;
  };
};

const useAddToCartDialog = create<AddToCartDialogState>()((set) => ({
  open: "closed",
  productId: undefined,
  quantity: undefined,
  actions: {
    setOpen: (open) =>
      set(() => {
        if (open !== "closed") {
          return {
            open,
          };
        } else {
          return {
            open,
            productId: undefined, // Clear the selected product ID
            quantity: undefined,
          };
        }
      }),
    setProductId: (productId) => set({ productId }),
    setQuantity: (quantity) => set({ quantity }),
  },
}));

export default useAddToCartDialog;
