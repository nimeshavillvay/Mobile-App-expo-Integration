import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import useCookies from "@/_hooks/storage/use-cookies.hook";
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
import useCartStore from "./use-cart-store.hook";

const useAddMultipleToCartMutation = () => {
  const [cookies] = useCookies();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { setExcludedSkus, setDiscontinuedSkus } = useCartStore(
    (state) => state.actions,
  );
  const excludedSkus = useCartStore((state) => state.excludedSkus);
  const discontinuedSkus = useCartStore((state) => state.discontinuedSkus);

  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

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
    mutationFn: async (
      products: {
        productId: number | undefined;
        quantity: number | null | undefined;
        poOrJobName?: string;
        sku: string;
        isDiscontinued?: boolean;
      }[],
    ) => {
      /**
       * These configuration values may be wrong due to we are not sending availability check call here. 
         Availability check endpoint is not accepting multiple product details. In that case
         we have to send availability check for each item. 
         However, once items are added to the cart and page re-loads, 
         it will send an API call to check availability and set the correct configuration details.
       */
      const configuration = {
        poOrJobName: "",
        will_call_avail: "",
        will_call_plant: "",
        selectedOption: "",
        backorder_all: "",
        hashvalue: "",
        avail_2: "",
        plant_2: "",
        shipping_method_2: "",
        avail_1: "",
        plant_1: "",
        shipping_method_1: "",
        avail_3: "",
        plant_3: "",
        shipping_method_3: "",
        avail_4: "",
        plant_4: "",
        shipping_method_4: "",
        avail_5: "",
        plant_5: "",
        shipping_method_5: "",
        backorder_quantity: "",
        backorder_date: "",
        will_call_not_in_stock: FALSE_STRING,
      };

      const discontinuedSkuList = [...discontinuedSkus];

      const productsInfo = products.map((product) => {
        if (
          product.isDiscontinued &&
          !discontinuedSkuList.includes(product.sku)
        ) {
          discontinuedSkuList.push(product.sku);
        }

        return {
          productid: product.productId,
          quantity: product.quantity,
          sku: product.sku,
          configuration: {
            ...configuration,
            poOrJobName: product.poOrJobName,
          },
          isDiscontinued: product.isDiscontinued,
        };
      });

      const checkAndConfigureAvailability = async () => {
        const productMap = new Map();
        // This is so that we remove duplicate products since when we send in cart post goes as 2 lines with 2 different hashes and then when
        //we receive from get we only get new updated has and that doesn't match the hash we have so thus default is not set
        productsInfo.forEach((product) => {
          const canBeAddedToCart =
            product.productid !== undefined &&
            product.quantity !== undefined &&
            product.quantity !== null &&
            !product.isDiscontinued;
          if (canBeAddedToCart) {
            if (productMap.has(product.productid)) {
              productMap.get(product.productid).quantity += product.quantity;
            } else {
              productMap.set(product.productid, { ...product });
            }
          }
        });

        let uniqueProducts = Array.from(productMap.values());
        // Create availability promises only for unique products
        const availabilityPromises = uniqueProducts.map((product) => {
          return checkAvailability(cookies[SESSION_TOKEN_COOKIE], {
            productId: product.productid,
            qty: product.quantity,
          }).then((availability) => ({ product, availability })); // Resolve each promise with both product and availability
        });

        const availabilityResults = await Promise.all(availabilityPromises);

        const excludedSkuList = [...excludedSkus];

        // Process each resolved value
        availabilityResults.forEach(({ product, availability }) => {
          if (availability.status === NOT_AVAILABLE) {
            uniqueProducts = uniqueProducts.filter(
              (item) => item["sku"] !== product["sku"],
            );
            if (!excludedSkuList.find((sku) => sku === product["sku"])) {
              excludedSkuList.push(product["sku"]);
            }
          } else if (availability.options && availability.options.length > 0) {
            const selectedOption = availability.options[0];
            if (selectedOption) {
              // Update product configuration based on the selected availability option
              product.configuration.backorder_all =
                selectedOption.type === "backOrderAll" &&
                selectedOption.backOrder
                  ? BACKORDER_ENABLED
                  : BACKORDER_DISABLED;
              product.configuration.hashvalue = selectedOption.hash;
              product.configuration.backorder_quantity =
                selectedOption.plants?.[0]?.backOrderQuantity?.toString() ??
                "0";
              product.configuration.backorder_date =
                selectedOption.plants?.[0]?.backOrderDate?.toString() ?? "";

              // Update configuration details for up to 5 plants
              if (product.configuration) {
                const addedIndexes = [];
                for (let i = 0; i < 5; i++) {
                  if (selectedOption.plants[i]) {
                    const selectedPlant = selectedOption.plants[i];
                    if (selectedPlant) {
                      const quantity = selectedPlant.quantity ?? "";
                      const index = i + 1; // Assuming index starts from 1 to 5
                      addedIndexes.push(index);

                      product.configuration[`avail_${index}`] =
                        quantity?.toString() ?? "";
                      product.configuration[`plant_${index}`] =
                        selectedPlant.plant ?? "";
                      product.configuration[`shipping_method_${index}`] =
                        selectedPlant.shippingMethods[0]?.code ?? "";
                    }
                  }
                }
              }
            }
          }
        });
        setExcludedSkus(excludedSkuList);
        setDiscontinuedSkus(discontinuedSkuList);

        return uniqueProducts;
      };

      const productsToAddToCart = await checkAndConfigureAvailability();
      if (productsToAddToCart.length <= 0) {
        return null;
      }

      const response = await api
        .post("rest/cart", {
          headers: {
            Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: {
            "configurable-items": productsToAddToCart,
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
    },
    onSettled: () => {
      gtmItemsInfo?.map((gtmItemInfo) => {
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
                quantity: gtmProducts.find(
                  (item) => item.productid === Number(gtmItemInfo?.productid),
                )?.quantity,
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
      });

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: () => {
      // Clear the selected product ID
      toast({
        variant: "destructive",
        title: "Failed to add item cart",
      });
    },
    onSuccess: async (data) => {
      if (data?.[0]?.error && data?.[0]?.error !== "") {
        toast({
          variant: "destructive",
          title: data?.[0]?.error,
        });
      } else {
        toast({
          variant: "default",
          title: "Items added to cart successfully!",
        });
      }
    },
  });
};

export default useAddMultipleToCartMutation;
