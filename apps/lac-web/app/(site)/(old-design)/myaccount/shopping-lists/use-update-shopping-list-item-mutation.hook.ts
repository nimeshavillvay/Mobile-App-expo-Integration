import { getGtmUser } from "@/_hooks/gtm/use-gtm-user.hook";
import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { getGtmProducts } from "@/_lib/apis/shared";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { getGTMPageType } from "@/_lib/gtm-utils";
import { sendGTMEvent } from "@next/third-parties/google";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateShoppingListItemMutation = (productId: number) => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();
  const token = cookies[SESSION_TOKEN_COOKIE];

  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  return useMutation({
    mutationFn: ({
      listIds,
      productId,
    }: {
      listIds: number[];
      productId: number;
    }) =>
      api
        .put("rest/my-favourite/list-items/", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          json: {
            productid: productId,
            list_ids: listIds,
          },
        })
        .json(),
    onSuccess: () => {
      toast({
        description: "Product updated from shopping list",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        description: "Failed to update product from shopping list",
        variant: "destructive",
      });
    },
    onSettled: async () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "favorite-skus"],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-account", "shopping-list"],
      });

      const [gtmItemInfoQuery, gtmUser] = await Promise.all([
        getGtmProducts(
          productId ? [{ productid: productId, cartid: 0 }] : [],
          token,
        ),
        getGtmUser(token),
      ]);
      const gtmItemInfo = gtmItemInfoQuery[0];

      sendGTMEvent({
        event: "add_to_wishlist",
        addToWishlistData: {
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
          page_type: getGTMPageType(
            pathnameHistory[pathnameHistory.length - 1] ?? "",
          ),
        },
        data: {
          userid: gtmUser.userid,
          account_type: gtmUser.account_type,
          account_industry: gtmUser?.account_industry,
          account_sales_category: gtmUser?.account_sales_category,
        },
      });
    },
  });
};

export default useUpdateShoppingListItemMutation;
