import { getGtmUser } from "@/_hooks/gtm/use-gtm-user.hook";
import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { getGtmProducts } from "@/_lib/apis/shared";
import { GTM_PAGE_TYPE_OTHER, SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useToast } from "@/old/_components/ui/use-toast";
import { sendGTMEvent } from "@next/third-parties/google";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveShoppingListItemMutation = (id: number) => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  const token = cookies[SESSION_TOKEN_COOKIE];

  return useMutation({
    mutationFn: ({
      listId,
      productId,
    }: {
      listId: string;
      productId: string;
    }) =>
      api
        .delete("rest/my-favourite/list-items/" + listId, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          json: {
            productid: productId,
          },
        })
        .json(),
    onMutate: () => {
      toast({ description: "Removing product from shopping list" });
    },
    onSuccess: () => {
      toast({
        description: "Product removed from shopping list",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to remove product from shopping list",
        variant: "destructive",
      });
    },
    onSettled: async (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["my-account", "shopping-list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", "favorite-skus", `sku-${variables.productId}`],
      });

      const gtmItemInfoQuery = await getGtmProducts(
        [{ productid: id, cartid: 0 }],
        token,
      );
      const gtmItemInfo = gtmItemInfoQuery?.[0];
      const gtmUser = await getGtmUser(token);

      sendGTMEvent({
        event: "remove_from_wishlist",
        removeFromWishlistData: {
          currency: "USD",
          value: gtmItemInfo?.price,
          items: [
            {
              item_id: gtmItemInfo?.item_id,
              item_sku: gtmItemInfo?.item_sku,
              item_name: gtmItemInfo?.item_name,
              item_brand: gtmItemInfo?.item_brand,
              price: gtmItemInfo?.price,
              quantity: 1,
              item_categoryid: gtmItemInfo?.item_categoryid,
              item_primarycategory: gtmItemInfo?.item_primarycategory,
              item_category: gtmItemInfo?.item_category_path[0] ?? "",
              item_category1: gtmItemInfo?.item_category_path[1] ?? "",
              item_category2: gtmItemInfo?.item_category_path[2] ?? "",
              item_category3: gtmItemInfo?.item_category_path[3] ?? "",
            },
          ],
          page_type: GTM_PAGE_TYPE_OTHER,
        },
        data: {
          userid: gtmUser?.userid,
          account_type: gtmUser?.account_type,
          account_industry: gtmUser?.account_industry,
          account_sales_category: gtmUser?.account_sales_category,
        },
      });
    },
  });
};

export default useRemoveShoppingListItemMutation;
