"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import { ShoppingCart } from "@repo/web-ui/components/icons/shopping-cart";

const Cart = ({
  token,
  type,
}: {
  readonly token: string;
  readonly type: string;
}) => {
  const cartQuery = useSuspenseCart(token);
  const quantity = cartQuery.data.cartItems.length;
  const displayQuantity = quantity > 99 ? "99+" : quantity.toString();

  return (
    <span className="relative">
      <ShoppingCart className={type === "desktop" ? "size-7" : ""} />
      <span className="absolute -right-1 -top-1 min-w-5 max-w-7 rounded-full bg-wurth-red-650 p-1 text-center text-[0.625rem] font-semibold leading-none text-white">
        {displayQuantity}
      </span>
    </span>
  );
};

export default Cart;
