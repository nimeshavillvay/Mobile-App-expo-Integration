import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const useDeleteCartItemMutation = () => {
  const [cookies] = useCookies();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ products }: { products: { cartid: number }[] }) => {
      return await api
        .delete("rest/cart", {
          headers: {
            Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: { products },
        })
        .json();
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export default useDeleteCartItemMutation;
