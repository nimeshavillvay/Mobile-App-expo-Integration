"use client";

import { createContext, useContext, useId, type ReactNode } from "react";

// This context is used to check the validity of various elements in the cart page
// when clicking the "Secure Checkout" button without wrapping the entire page in
// a single form element.

const CartFormIdContext = createContext("");

export const useCartFormIdContext = () => {
  const cartFormId = useContext(CartFormIdContext);

  if (!cartFormId) {
    throw new Error("No cart form ID given through CartFormIdContext provider");
  }

  return cartFormId;
};

export const CartFormIdProvider = ({
  children,
}: {
  readonly children: ReactNode;
}) => {
  const id = useId();

  return (
    <CartFormIdContext.Provider value={id}>
      {children}
    </CartFormIdContext.Provider>
  );
};
