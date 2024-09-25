"use client";

import useSuspenseWillCallPlant from "@/_hooks/address/use-suspense-will-call-plant.hook";
import useCartStore from "@/_hooks/cart/use-cart-store.hook";
import useDeleteCartItemMutation from "@/_hooks/cart/use-delete-cart-item-mutation.hook";
import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useUpdateCartConfigMutation from "@/_hooks/cart/use-update-cart-config-mutation.hook";
import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import useSuspenseFavoriteSKUs from "@/_hooks/shopping-list/use-suspense-favorite-skus.hook";
import { getGTMPageType } from "@/_lib/gtm-utils";
import type { GtmProduct, Plant } from "@/_lib/types";
import { sendGTMEvent } from "@next/third-parties/google";
import { Alert as AlertIcon } from "@repo/web-ui/components/icons/alert";
import { Close } from "@repo/web-ui/components/icons/close";
import { Trash } from "@repo/web-ui/components/icons/trash";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "@repo/web-ui/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/web-ui/components/ui/alert-dialog";
import { Button } from "@repo/web-ui/components/ui/button";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import dynamic from "next/dynamic";
import { Suspense, useDeferredValue, useState } from "react";
import CartItemFallback from "../cart-item-fallback";
import { CartItemQuantityProvider } from "../cart-item-quantity-context";
import useUnSavedAlternativeQuantityState from "../use-cart-alternative-qty-method-store.hook";
import useCartPageStore from "../use-cart-page-store.hook";
import CartItem from "./cart-item";

type CartListProps = {
  readonly token: string;
  readonly plants: Plant[];
};

const DynamicAddMoreItemsSectionForMobile = dynamic(
  () => import("../_add-more-items/add-more-items-form-mobile"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[36px] w-full" />,
  },
);

const CartList = ({ token, plants }: CartListProps) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const { data } = useSuspenseCart(token);
  const deleteCartItemMutation = useDeleteCartItemMutation();
  const updateCartConfigMutation = useUpdateCartConfigMutation();

  const skus = useUnSavedAlternativeQuantityState((state) => state.sku);
  const { popSku } = useUnSavedAlternativeQuantityState(
    (state) => state.actions,
  );

  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  const gtmProducts = data.cartItems.map((item) => {
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

  const handleClearCart = () => {
    if (data.cartItems.length > 0) {
      const cartItemIds = data.cartItems.map((item) => ({
        cartid: item.cartItemId,
      }));

      if (cartItemIds.length > 0) {
        popSku(skus);
        deleteCartItemMutation.mutate(
          {
            products: cartItemIds,
          },
          {
            onSettled: () => {
              setDeleteConfirmation(false);

              if (gtmItemsInfo !== undefined && gtmItemsInfo !== null) {
                gtmItemsInfo.forEach((gtmItemInfo) => {
                  sendGTMEvent({
                    event: "remove_from_cart",
                    removeFromCartData: {
                      currency: "USD",
                      value: gtmItemInfo?.price,
                      items: [
                        {
                          item_id: gtmItemInfo?.item_id,
                          item_sku: gtmItemInfo?.item_sku,
                          item_name: gtmItemInfo?.item_name,
                          price: gtmItemInfo?.price,
                          quantity: 1,
                        },
                      ],
                    },
                    data: {
                      userid: gtmUser?.userid,
                      account_type: gtmUser?.account_type,
                      account_industry: gtmUser?.account_industry,
                      account_sales_category: gtmUser?.account_sales_category,
                    },
                    page_type: getGTMPageType(
                      pathnameHistory[pathnameHistory.length - 1] ?? "",
                    ),
                  });
                });
              }
            },
          },
        );

        updateCartConfigMutation.mutate({ coupon: "" });
      }
    }
  };

  const excludedSkus = useCartStore((state) => state.excludedSkus);
  const discontinuedSkus = useCartStore((state) => state.discontinuedSkus);
  const { setExcludedSkus, setDiscontinuedSkus } = useCartStore(
    (state) => state.actions,
  );

  return (
    <>
      {Array.isArray(excludedSkus) && excludedSkus.length > 0 && (
        <Alert variant="destructive" className="mb-2">
          <AlertIcon className="size-4" />
          <AlertContent>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {excludedSkus
                .join(", ")
                .concat(
                  excludedSkus.length === 1 ? " Product is" : " Products are",
                )
                .concat(
                  " not available online. Please call Customer Service for availability",
                )}
            </AlertDescription>
          </AlertContent>
          <Button
            className="absolute right-1 top-1 h-fit w-fit cursor-pointer hover:bg-transparent"
            variant="ghost"
            type="button"
            onClick={() => setExcludedSkus([])}
          >
            <Close
              className="stroke-red-800"
              width={12}
              height={12}
              data-button-action="Cart Remove Not Available Notice"
            />
          </Button>
        </Alert>
      )}

      {Array.isArray(discontinuedSkus) && discontinuedSkus.length > 0 && (
        <Alert variant="destructive" className="mb-2">
          <AlertIcon className="size-4" />
          <AlertContent>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {discontinuedSkus
                .join(", ")
                .concat(
                  discontinuedSkus.length === 1
                    ? " Product has"
                    : " Products have",
                )
                .concat(" been discontinued")}
            </AlertDescription>
          </AlertContent>
          <Button
            className="absolute right-1 top-1 h-fit w-fit cursor-pointer hover:bg-transparent"
            variant="ghost"
            type="button"
            onClick={() => setDiscontinuedSkus([])}
          >
            <Close
              className="stroke-red-800"
              width={12}
              height={12}
              data-button-action="Cart Remove Discontinued Notice"
            />
          </Button>
        </Alert>
      )}

      <ul className="flex flex-col gap-2.5">
        {data.cartItems.length > 0 && (
          <CartListItems
            token={token}
            plants={plants}
            gtmItemsInfo={gtmItemsInfo}
          />
        )}

        <div className="flex w-full justify-end gap-4 px-4 md:px-0">
          {data.cartItems.length > 0 && (
            <AlertDialog
              open={deleteConfirmation}
              onOpenChange={setDeleteConfirmation}
            >
              <AlertDialogTrigger asChild>
                <Button
                  variant="subtle"
                  className="btn-clear-cart flex-1 bg-red-50 font-bold text-wurth-red-650 hover:bg-red-100 md:flex-none"
                  disabled={deleteCartItemMutation.isPending}
                >
                  <Trash
                    className="size-4 fill-wurth-red-650"
                    data-button-action="Clear Cart"
                  />
                  <span>Clear cart</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Cart</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure want to delete your cart?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleClearCart()}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <div className="flex-1 md:hidden">
            <DynamicAddMoreItemsSectionForMobile />
          </div>
        </div>
      </ul>
    </>
  );
};

export default CartList;

const CartListItems = ({
  token,
  plants,
  gtmItemsInfo,
}: {
  token: string;
  readonly plants: Plant[];
  readonly gtmItemsInfo: GtmProduct[] | undefined;
}) => {
  // TODO Delete this hook after refactoring the entire cart item section
  const cartItemKey = useCartPageStore((state) => state.cartItemKey);

  const { data } = useSuspenseCart(token);
  const willCallPlantQuery = useSuspenseWillCallPlant(token);

  const products = data.cartItems.map((item) => ({
    productId: item.itemInfo.productId,
    qty: item.quantity,
    cartId: item.cartItemId,
  }));
  const deferredProducts = useDeferredValue(products);
  const priceCheckQuery = useSuspensePriceCheck(token, deferredProducts);

  const favoriteSkusQuery = useSuspenseFavoriteSKUs(
    token,
    data.cartItems.map((item) => item.itemInfo.productId.toString()),
  );

  return data.cartItems.map((item) => {
    const priceData = priceCheckQuery.data.productPrices.find(
      (price) => Number(price.productId) === item.itemInfo.productId,
    );
    const favoriteSkuData = favoriteSkusQuery.data.find(
      (skuItem) => skuItem.productId === item.itemInfo.productId,
    );

    if (!priceData) {
      return null;
    }

    return (
      <li
        key={`${item.itemInfo.productId}-${item.cartItemId}`}
        className="border-b border-b-wurth-gray-250 px-4 pb-7 md:px-0 [&:not(:first-child)]:pt-7"
      >
        <Suspense fallback={<CartItemFallback />}>
          <CartItemQuantityProvider
            lineQuantity={item.quantity.toString()}
            minQuantity={item.itemInfo.minimumOrderQuantity}
          >
            <CartItem
              key={cartItemKey.toString()}
              token={token}
              product={{
                id: item.itemInfo.productId,
                title: item.itemInfo.productName,
                sku: item.itemInfo.productSku,
                manufacturerId: item.itemInfo.mfrPartNo,
                quantity: item.quantity,
                configuration: item.configuration,
                minAmount: item.itemInfo.minimumOrderQuantity,
                increment: item.itemInfo.quantityByIncrements,
                image: item.itemInfo.image,
                cartItemId: item.cartItemId,
                slug: item.itemInfo.slug,
                isExcludedProduct: item.itemInfo.isExcludedProduct,
                uom: item.itemInfo.unitOfMeasure,
                isHazardous: item.itemInfo.isHazardous,
                isDirectlyShippedFromVendor:
                  item.itemInfo.isDirectlyShippedFromVendor,
              }}
              isLaminate={item.isLaminate}
              plants={plants}
              cartConfiguration={data.configuration}
              willCallPlant={willCallPlantQuery?.data}
              priceData={{
                ...priceData,
                productId: Number(priceData.productId),
                priceUnit: priceData.priceUnit,
              }}
              gtmItemInfo={gtmItemsInfo?.find(
                (product) =>
                  Number(product?.productid) === item.itemInfo.productId,
              )}
              isFavorite={favoriteSkuData?.isFavorite}
              favoriteListIds={favoriteSkuData?.favoriteListIds}
            />
          </CartItemQuantityProvider>
        </Suspense>
      </li>
    );
  });
};
