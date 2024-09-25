import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { sendGTMEvent } from "@next/third-parties/google";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useCheckoutMutation = () => {
  const [cookies] = useCookies();
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const cartQuery = useSuspenseCart(cookies[SESSION_TOKEN_COOKIE]);

  const gtmProducts = cartQuery.data.cartItems.map((item) => {
    return {
      productid: item.itemInfo.productId,
      cartid: item.cartItemId,
      quantity: item.quantity,
    };
  });

  const gtmItemInfoQuery = useGtmProducts(
    gtmProducts.length > 0 ? gtmProducts : [],
  );
  const gtmItemsInfo = gtmItemInfoQuery.data;

  const gtmItemUserQuery = useGtmUser();
  const gtmUser = gtmItemUserQuery.data;

  return useMutation({
    mutationFn: () =>
      api
        .post("rest/checkout", {
          headers: {
            Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
        })
        .json<{
          orderids: [string];
        }>(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: () => {
      toast({
        title: "Failed to place order",
        description: "Please try again later",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Successfully placed order",
      });

      if (gtmItemsInfo !== null && gtmItemsInfo !== undefined) {
        gtmItemsInfo?.forEach((gtmItemInfo) => {
          sendGTMEvent({
            event: "purchase",
            purchaseData: {
              currency: "USD",
              value: gtmItemInfo?.price,
              orderEnteredByOSR: "",
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
                },
              ],
            },
            data: {
              userid: gtmUser?.userid,
              account_type: gtmUser?.account_type,
              account_industry: gtmUser?.account_industry,
              account_sales_category: gtmUser?.account_sales_category,
            },
          });
        });
      }

      router.replace(`/confirmation/${data.orderids[0]}`);
    },
  });
};

export default useCheckoutMutation;
