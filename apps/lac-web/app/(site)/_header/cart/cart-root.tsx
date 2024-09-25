import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import Cart from "./cart";

const CartRoot = ({ type }: { readonly type: string }) => {
  const cookiesStore = cookies();
  const sessionCookie = cookiesStore.get(SESSION_TOKEN_COOKIE);

  if (!sessionCookie?.value) {
    return null;
  }

  return <Cart type={type} token={sessionCookie?.value} />;
};

export default CartRoot;
