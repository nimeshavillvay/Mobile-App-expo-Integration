"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";

type CartHeadingProps = {
  readonly token: string;
};

const CartHeading = ({ token }: CartHeadingProps) => {
  const { data } = useSuspenseCart(token);

  return (
    <h1 className="container mb-6 mt-4 text-2xl font-light tracking-[-0.144px] text-wurth-gray-800 md:mb-7 md:mt-6 md:text-[2.5rem] md:leading-[3rem] md:tracking-[-0.576px]">
      <span className="font-medium">Cart</span> ({data.cartItems.length}{" "}
      {data.totalQuantity === 1 ? "item" : "items"})
    </h1>
  );
};

export default CartHeading;
