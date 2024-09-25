import { getPrices } from "@/_lib/apis/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspensePriceCheck = (
  token: Parameters<typeof getPrices>[0],
  products: Parameters<typeof getPrices>[1],
) => {
  return useSuspenseQuery({
    queryKey: ["user", "price-check", products, token],
    queryFn: () => getPrices(token, products),
    staleTime: 1000 * 60 * 10, // 10 mins
    gcTime: 1000 * 60 * 30, // 30 mins
  });
};

export default useSuspensePriceCheck;
