import { shippingMethods } from "@/_lib/apis/shared";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseShippingMethods = (token: string, isForCart?: boolean) => {
  return useSuspenseQuery({
    queryKey: ["cart", "shipping-methods", token, isForCart],
    queryFn: () => shippingMethods(token, isForCart),
  });
};

export default useSuspenseShippingMethods;
