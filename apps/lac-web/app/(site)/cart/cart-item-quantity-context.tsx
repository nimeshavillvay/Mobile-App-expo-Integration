"use client";

import { NUMBER_TYPE } from "@/_lib/zod-helper";
import { createContext, useContext, useState, type ReactNode } from "react";
import { z } from "zod";

// This context is used to keep line item total quantities

const CartItemQuantityContext = createContext<{
  lineQuantity: string;
  setLineQuantity: (quantity: string) => void;
} | null>(null);

export const useCartItemQuantityContext = () => {
  const context = useContext(CartItemQuantityContext);
  if (!context) {
    throw new Error(
      "useCartItemQuantityContext should be used within CartItemQuantityProvider",
    );
  }

  return context;
};

export const CartItemQuantityProvider = ({
  children,
  lineQuantity: initialLineQuantity,
  minQuantity: initialMinQuantity,
}: {
  readonly children: ReactNode;
  readonly lineQuantity: string;
  readonly minQuantity: number;
}) => {
  const cartItemSchema = z.object({
    quantity: NUMBER_TYPE,
  });
  const quantity = cartItemSchema.safeParse({ quantity: initialLineQuantity });

  const [lineQuantity, setLineQuantity] = useState(
    quantity.success ? initialLineQuantity : initialMinQuantity.toString(),
  );

  return (
    <CartItemQuantityContext.Provider value={{ lineQuantity, setLineQuantity }}>
      {children}
    </CartItemQuantityContext.Provider>
  );
};
