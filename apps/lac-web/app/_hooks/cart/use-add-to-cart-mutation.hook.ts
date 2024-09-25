import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import { api } from "@/_lib/api";
import { checkAvailability } from "@/_lib/apis/shared";
import {
  BACKORDER_DISABLED,
  BACKORDER_ENABLED,
  FALSE_STRING,
  NOT_AVAILABLE,
  SESSION_TOKEN_COOKIE,
} from "@/_lib/constants";
import { getGTMPageType } from "@/_lib/gtm-utils";
import { sendGTMEvent } from "@next/third-parties/google";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useGtmUser from "../gtm/use-gtm-user.hook";
import usePathnameHistoryState from "../misc/use-pathname-history-state.hook";
import useCookies from "../storage/use-cookies.hook";

const useAddToCartMutation = ({ productId }: { productId: number }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [cookies] = useCookies();

  const token = cookies[SESSION_TOKEN_COOKIE];

  const { setOpen, setProductId } = useAddToCartDialog(
    (state) => state.actions,
  );

  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  const [quantity, setQuantity] = useState(0);

  const gtmItemInfoQuery = useGtmProducts(
    productId ? [{ productid: productId, cartid: 0 }] : [],
  );
  const gtmItemInfo = gtmItemInfoQuery.data?.[0];

  const gtmItemUserQuery = useGtmUser();
  const gtmUser = gtmItemUserQuery.data;

  return useMutation({
    mutationFn: async ({
      quantity,
      poOrJobName = "",
    }: {
      quantity: number;
      poOrJobName?: string;
    }) => {
      setQuantity(quantity);
      const configuration: { [key: string]: string } = {
        poOrJobName,
        will_call_avail: "",
        will_call_plant: "",
        selectedOption: "",
        will_call_not_in_stock: FALSE_STRING,
      };

      const availability = await checkAvailability(token, {
        productId,
        qty: quantity,
      });

      if (availability.options[0]) {
        const selectedOption = availability.options[0];
        configuration.backorder_all =
          selectedOption.type === "backOrderAll" && selectedOption.backOrder
            ? BACKORDER_ENABLED
            : BACKORDER_DISABLED;
        configuration.hashvalue = selectedOption.hash;
        configuration.backorder_quantity =
          selectedOption.plants?.[0]?.backOrderQuantity?.toString() ?? "0";
        configuration.backorder_date =
          selectedOption.plants?.[0]?.backOrderDate?.toString() ?? "";

        // Keep track of the added plants(indexes)
        const addedIndexes: number[] = [];

        // Add the plants
        for (let i = 0; i < 5; i++) {
          if (selectedOption.plants[i]) {
            const selectedPlant = selectedOption.plants[i];

            if (selectedPlant) {
              const quantity = selectedPlant.quantity ?? "";
              const index = selectedPlant.index;
              addedIndexes.push(index);

              configuration[`avail_${index}`] = quantity?.toString() ?? "";
              configuration[`plant_${index}`] = selectedPlant.plant ?? "";
              configuration[`shipping_method_${index}`] =
                selectedPlant.shippingMethods[0]?.code ?? "";
            }
          }
        }

        // Add the missing plants
        for (let i = 1; i <= 5; i++) {
          if (!addedIndexes.includes(i)) {
            configuration[`avail_${i}`] = "";
            configuration[`plant_${i}`] = "";
            configuration[`shipping_method_${i}`] = "";
          }
        }
      }

      if (availability.status !== NOT_AVAILABLE) {
        const response = await api
          .post("rest/cart", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            json: {
              "configurable-items": [
                {
                  productid: productId,
                  quantity,
                  configuration,
                },
              ],
            },
          })
          .json<
            {
              car_item_id: boolean | number;
              error?: string;
              productid: number;
            }[]
          >();

        // Return transformed data
        return response.map((item) => ({
          cartItemId: item.car_item_id,
          productId: item.productid,
          error: item.error,
        }));
      }

      return;
    },
    onMutate: () => {
      // Prefetch the product data for the dialog
      setProductId(productId);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: () => {
      // Clear the selected product ID
      setProductId(undefined);
      toast({
        variant: "destructive",
        title: "Failed to add item cart",
      });
    },
    onSuccess: async (data) => {
      if (data === undefined) {
        return;
      }
      if (data?.[0]?.["error"] && data?.[0]?.["error"] !== "") {
        if (data?.[0]?.["error"] == "amount") {
          toast({
            variant: "destructive",
            title: "Invalid Quantity",
          });
        } else {
          toast({
            variant: "destructive",
            title: data?.[0]?.["error"],
          });
        }
      } else {
        // Open the dialog
        setOpen("confirmation");
        sendGTMEvent({
          event: "add_to_cart",
          addToCartData: {
            currency: "USD",
            value: gtmItemInfo?.price,
            items: [
              {
                item_id: gtmItemInfo?.item_id,
                item_sku: gtmItemInfo?.item_sku,
                item_name: gtmItemInfo?.item_name,
                item_brand: gtmItemInfo?.item_brand,
                price: gtmItemInfo?.price,
                quantity: quantity,
                item_variant: gtmItemInfo?.item_variant,
                item_categoryid: gtmItemInfo?.item_categoryid,
                item_primarycategory: gtmItemInfo?.item_primarycategory,
                item_category: gtmItemInfo?.item_category_path[0],
                item_category1: gtmItemInfo?.item_category_path[1],
              },
            ],
            data: {
              userid: gtmUser?.userid,
              account_type: gtmUser?.account_type,
              account_industry: gtmUser?.account_industry,
              account_sales_category: gtmUser?.account_sales_category,
            },
            page_type: getGTMPageType(
              pathnameHistory[pathnameHistory.length - 1] ?? "",
            ),
          },
        });
      }
    },
  });
};

export default useAddToCartMutation;
