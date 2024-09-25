import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { cookies } from "next/headers";
import { type ComponentProps } from "react";
import AddToCartForm from "./add-to-cart-form";
import SuspenseFallback from "./suspense-fallback";

const AddToCartFormWrapper = (
  props: Omit<ComponentProps<typeof AddToCartForm>, "token">,
) => {
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get(SESSION_TOKEN_COOKIE);

  return <AddToCartForm token={sessionToken?.value} {...props} />;
};

const AddToCartFormRoot = (
  props: ComponentProps<typeof AddToCartFormWrapper>,
) => {
  return (
    <SuspenseFallback>
      <AddToCartFormWrapper {...props} />
    </SuspenseFallback>
  );
};

export default AddToCartFormRoot;
