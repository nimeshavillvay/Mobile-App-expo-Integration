"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useSuspenseSimulationCheckout from "@/_hooks/cart/use-suspense-simulation-checkout.hook";
import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import { GTM_ITEM_PAGE_TYPES } from "@/_lib/constants";
import { getGTMPageType } from "@/_lib/gtm-utils";
import type { Plant } from "@/_lib/types";
import { cn, formatNumberToPrice } from "@/_lib/utils";
import { sendGTMEvent } from "@next/third-parties/google";
import { ChevronDown } from "@repo/web-ui/components/icons/chevron-down";
import { Button, buttonVariants } from "@repo/web-ui/components/ui/button";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
// eslint-disable-next-line no-restricted-imports
import { Suspense, useEffect, useState } from "react";
import RegionalExclusionAndShippingMethods from "./regional-exclusion-and-shipping-methods";

type CartSummaryProps = {
  readonly token: string;
  readonly plants: Plant[];
};

const CartSummary = ({ token, plants }: CartSummaryProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const simulationCheckoutQuery = useSuspenseSimulationCheckout(token);
  const cartQuery = useSuspenseCart(token);

  const gtmProducts = cartQuery.data.cartItems.map((item) => {
    return {
      productid: item.itemInfo.productId,
      cartid: item.cartItemId,
      quantity: item.quantity,
    };
  });

  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  const gtmItemInfoQuery = useGtmProducts(
    gtmProducts.length > 0 ? gtmProducts : [],
  );
  const gtmItemsInfo = gtmItemInfoQuery.data;

  const gtmItemUserQuery = useGtmUser();
  const gtmUser = gtmItemUserQuery.data;

  const sendToGTMCartClicked = () => {
    if (gtmItemsInfo !== null && gtmItemsInfo !== undefined) {
      gtmItemsInfo?.forEach((gtmItemInfo) => {
        sendGTMEvent({
          event: "view_cart",
          viewCartData: {
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
  };
  const sendToGTMProductView = (productId: number) => {
    const gtmItemInfo = gtmItemsInfo?.filter(
      (item) => Number(item.productid) === productId,
    )[0];
    if (gtmItemInfo) {
      sendGTMEvent({
        event: "select_item",
        item_list_name: GTM_ITEM_PAGE_TYPES.CHECKOUT,
        selectItemData: {
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
        page_type: getGTMPageType(
          pathnameHistory[pathnameHistory.length - 1] ?? "",
        ),
      });
    }
  };

  useEffect(() => {
    const gtmItemsInfo = gtmItemInfoQuery.data;
    const gtmUser = gtmItemUserQuery.data;
    if (gtmItemsInfo !== undefined) {
      gtmItemsInfo?.forEach((gtmItemInfo) => {
        sendGTMEvent({
          event: "begin_checkout",
          beginCheckoutData: {
            currency: "USD",
            value: simulationCheckoutQuery.data.net,
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
                item_categoryid: gtmItemInfo?.item_categoryid,
                item_primarycategory: gtmItemInfo?.item_primarycategory,
                item_category: gtmItemInfo?.item_category_path[0] ?? "",
                item_category1: gtmItemInfo?.item_category_path[1] ?? "",
                item_category2: gtmItemInfo?.item_category_path[2] ?? "",
                item_category3: gtmItemInfo?.item_category_path[3] ?? "",
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
  }, [
    gtmItemInfoQuery.data,
    gtmItemUserQuery.data,
    pathnameHistory,
    simulationCheckoutQuery.data.net,
    gtmProducts,
  ]);

  return (
    <section className="flex max-w-full flex-col gap-6 rounded-lg border border-wurth-gray-250 p-5 shadow-lg md:p-6">
      <div className="flex flex-row items-center justify-between">
        <h2 className="font-title text-xl font-medium text-wurth-gray-800 md:text-2xl md:tracking-[-0.144px]">
          Cart Summary{" "}
          <span className="text-base leading-7 text-wurth-gray-500 md:text-xl md:leading-7">
            ({simulationCheckoutQuery.data.cartItemsCount}{" "}
            {simulationCheckoutQuery.data.totalQuantity === 1
              ? "item"
              : "items"}
            )
          </span>
        </h2>

        <Link
          href="/cart"
          replace
          onClick={sendToGTMCartClicked}
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "btnAction font-bold text-black shadow-md",
          )}
          data-button-action="Checkout Edit Cart"
        >
          Edit Cart
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {!showDetails ? (
          <div className="flex w-full snap-x flex-row items-center gap-3 overflow-x-auto">
            {cartQuery.data.cartItems.map((item) => (
              <div
                key={item.itemInfo.productId}
                className="relative shrink-0 snap-start"
              >
                <Link
                  href={`/product/${item.itemInfo.productId}/${item.itemInfo.slug}`}
                  onClick={() => sendToGTMProductView(item.itemInfo.productId)}
                  className="btn-view-product btnAction btn-product-detail-img"
                  data-btn-action="View Product"
                >
                  <Image
                    src={item.itemInfo.image}
                    alt={`An image of ${item.itemInfo.productName}`}
                    width={96}
                    height={96}
                    className="aspect-1 rounded border border-wurth-gray-250 object-contain shadow-sm"
                  />
                  <span className="sr-only">{item.itemInfo.productName}</span>

                  <span className="absolute bottom-1 right-1 rounded-full bg-wurth-gray-800 p-1 text-center text-[0.625rem] font-semibold leading-none text-white">
                    {item.quantity}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 divide-y divide-wurth-gray-150">
            {cartQuery.data.cartItems.map(
              ({ itemInfo, quantity, mappedConfiguration }) => (
                <div
                  key={itemInfo.productId}
                  className="flex flex-col gap-2 [&:not(:first-child)]:pt-4"
                >
                  <div className="flex flex-row gap-3">
                    <Link
                      href={`/product/${itemInfo.productId}/${itemInfo.slug}`}
                      onClick={() => sendToGTMProductView(itemInfo.productId)}
                      className="btn-view-product btnAction btn-product-detail-img"
                      data-btn-action="View Product"
                    >
                      <Image
                        src={itemInfo.image}
                        alt={`An image of ${itemInfo.productName}`}
                        width={84}
                        height={84}
                        className="aspect-1 shrink-0 rounded border border-wurth-gray-250 object-contain shadow-sm"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="btnAction flex flex-row items-center text-sm text-wurth-gray-800">
                        <Link
                          href={`/product/${itemInfo.productId}/${itemInfo.slug}`}
                          onClick={() =>
                            sendToGTMProductView(itemInfo.productId)
                          }
                          className="btn-view-product btnAction product-title btn-product-detail w-2/4 md:w-4/6"
                          data-btn-action="View Product"
                        >
                          <h4
                            className="line-clamp-3 text-sm font-medium text-wurth-gray-800"
                            dangerouslySetInnerHTML={{
                              __html: itemInfo.productName,
                            }}
                          />
                        </Link>

                        <div className="w-1/4 self-start md:w-1/6">
                          {quantity} {itemInfo.unitOfMeasure}
                        </div>

                        <div className="w-1/4 self-start text-right md:w-1/6">
                          $
                          {formatNumberToPrice(
                            parseFloat(
                              (
                                simulationCheckoutQuery.data.productslist.find(
                                  (product) =>
                                    product.productId === itemInfo.productId,
                                )?.extendedPrice ?? 0
                              ).toFixed(2),
                            ),
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap text-sm text-wurth-gray-800">
                        <Suspense
                          fallback={<Skeleton className="h-5 w-[400px]" />}
                        >
                          <RegionalExclusionAndShippingMethods
                            token={token}
                            mappedConfiguration={mappedConfiguration}
                            plants={plants}
                            productId={itemInfo.productId}
                          />
                        </Suspense>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        )}

        <Button
          variant="subtle"
          onClick={() => setShowDetails((showDetails) => !showDetails)}
          className="md:self-start"
        >
          <ChevronDown
            width={16}
            height={16}
            className={cn(
              "font-bold text-black transition duration-150 ease-out",
              showDetails && "rotate-180",
            )}
            data-button-action={`Checkout ${showDetails ? "Hide" : "Show"} Details`}
          />
          <span>{showDetails ? "Hide" : "Show"} details</span>
        </Button>
      </div>
    </section>
  );
};

export default CartSummary;
