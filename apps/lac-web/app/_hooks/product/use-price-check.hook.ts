import { getPrices } from "@/_lib/apis/client";
import {
  keepPreviousData,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";

type PriceCheckQueryOptions = UseQueryOptions<
  Awaited<ReturnType<typeof getPrices>>
>;

/**
 * Use `useSuspensePriceCheck` over `usePriceCheck`. `usePriceCheck` was
 * initially developed to get the prices of other variants in the product
 * card after the price of the 1st variant was fetched by the `useSuspensePriceCheck`
 * hook and then passed onto this hook as the initial data.
 */
const usePriceCheck = (
  token: Parameters<typeof getPrices>[0],
  products: Parameters<typeof getPrices>[1],
  options?: Omit<PriceCheckQueryOptions, "queryKey" | "queryFn" | "enabled">,
) => {
  return useQuery({
    queryKey: ["user", "price-check", products, token],
    queryFn: () => getPrices(token, products),
    staleTime: Infinity,
    enabled: products.length > 0,
    placeholderData: keepPreviousData,
    ...options,
  });
};

export default usePriceCheck;
