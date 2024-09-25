import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import type { Cart, CartConfiguration } from "@/_lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const useUpdateCartConfigMutation = <
  T extends Partial<Required<CartConfiguration>>,
>() => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();

  const sessionToken = cookies[SESSION_TOKEN_COOKIE];

  return useMutation({
    mutationFn: async (config: T) => {
      return await api
        .patch("rest/cart-config", {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
          json: config,
        })
        .json<{
          configuration: CartConfiguration;
          error: Partial<Record<keyof T, string>>;
        }>();
    },
    onMutate: async (fields) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["cart", sessionToken] });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData(["cart", sessionToken]);

      // Optimistically update to the new value
      queryClient.setQueryData(["cart", sessionToken], (old: unknown) => {
        const newCart = structuredClone(old);

        if (isCart(newCart)) {
          newCart.configuration = {
            ...newCart.configuration,
            ...fields,
          };
        }

        return newCart;
      });

      // Return a context object with the snapshotted value
      return {
        previousCart,
      };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_error, _fields, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart", sessionToken], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", "will-call-plant"],
      });
    },
  });
};

export default useUpdateCartConfigMutation;

const isCart = (data: unknown): data is Cart => {
  return (
    typeof data === "object" &&
    (data as Cart).cartItems !== undefined &&
    Array.isArray((data as Cart).cartItems) &&
    typeof (data as Cart).configuration === "object" &&
    typeof (data as Cart)["total-quantity"] === "number"
  );
};
