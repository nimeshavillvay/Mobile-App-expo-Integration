import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import type { CartItemConfiguration } from "@/_lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const useUpdateCartItemMutation = () => {
  const [cookies] = useCookies();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      products: {
        quantity?: number; // The optional feature has been made conditional as it's unnecessary when closing the confirmation dialog popup for add to cart.
        cartItemId: number;
        price?: number;
        config: CartItemConfiguration;
      }[],
    ) => {
      return await api
        .put("rest/cart", {
          headers: {
            Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: {
            cartitembatchconfiguration: products.map((product) => ({
              quantity: product.quantity,
              cartid: product.cartItemId,
              price: product.price,
              cartitemconfiguration: product.config,
            })),
          },
        })
        .json();
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onSuccess: (_data, variables) => {
      // Check if the price has been updated and invalidate the price-check query
      if (variables?.at(0)?.price) {
        queryClient.invalidateQueries({
          queryKey: ["user", "price-check"],
        });
      }
    },
  });
};

export default useUpdateCartItemMutation;
