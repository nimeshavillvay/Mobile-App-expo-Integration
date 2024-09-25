"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useUpdateCartItemMutation from "@/_hooks/cart/use-update-cart-item-mutation.hook";
import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import useItemInfo from "@/_hooks/product/use-item-info.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import { formatNumberToPrice } from "@/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendGTMEvent } from "@next/third-parties/google";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/web-ui/components/ui/dialog";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddToCartDialogSchema = z.object({
  poOrJobName: z.string(),
});

type ConfirmationDialogProps = {
  readonly token: string;
};

const ConfirmationDialog = ({ token }: ConfirmationDialogProps) => {
  const id = useId();
  const jobNameId = `job-name-${id}`;

  const open = useAddToCartDialog((state) => state.open);
  const productId = useAddToCartDialog((state) => state.productId);
  const quantity = useAddToCartDialog((state) => state.quantity);
  const { setOpen } = useAddToCartDialog((state) => state.actions);

  const onOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setOpen("closed");
    } else {
      setOpen(open);
    }
  };

  const itemInfoQuery = useItemInfo(productId ? [productId] : []);
  const itemInfo = itemInfoQuery.data?.[0];

  const gtmItemInfoQuery = useGtmProducts(
    productId ? [{ productid: productId, cartid: 0 }] : [],
  );
  const gtmItemInfo = gtmItemInfoQuery.data?.[0];

  const gtmItemUserQuery = useGtmUser();
  const gtmUser = gtmItemUserQuery.data;

  const cartQuery = useSuspenseCart(token);

  const itemInCart = cartQuery.data.cartItems.find(
    (item) => item.itemInfo.productId === productId,
  );

  const { register, getValues } = useForm<
    z.infer<typeof AddToCartDialogSchema>
  >({
    values: {
      poOrJobName: itemInCart?.configuration.poOrJobName ?? "",
    },
    resolver: zodResolver(AddToCartDialogSchema),
  });

  const updateCartItemMutation = useUpdateCartItemMutation();

  const handleSave = () => {
    const data = getValues();

    if (productId && quantity && itemInCart) {
      updateCartItemMutation.mutate([
        {
          cartItemId: itemInCart.cartItemId,
          config: {
            ...itemInCart.configuration,
            poOrJobName: data.poOrJobName,
          },
          quantity: itemInCart.quantity,
        },
      ]);
    }
  };

  const closeDialog = () => {
    setOpen("closed");
  };

  const goToCart = () => {
    closeDialog();

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
            quantity: quantity,
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
  };

  return (
    <Dialog open={open === "confirmation"} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-w-[31.75rem] flex-col gap-4">
        <DialogHeader>
          <div className="flex flex-row items-center gap-2">
            <CheckCircle width={20} height={20} className="stroke-green-700" />

            <DialogTitle className="text-lg font-normal text-wurth-gray-800">
              Item added
            </DialogTitle>
          </div>

          <DialogDescription className="sr-only">
            View the added item here.
          </DialogDescription>
        </DialogHeader>

        {itemInfo ? (
          <div className="flex flex-row items-start gap-4">
            <Image
              src={itemInfo.image}
              alt={`An image of ${itemInfo.productName}`}
              width={128}
              height={128}
              className="shrink-0 rounded border border-wurth-gray-250 object-contain shadow-sm"
            />

            <div className="flex flex-1 flex-col gap-2">
              <h3
                className="line-clamp-3 text-sm font-medium"
                dangerouslySetInnerHTML={{ __html: itemInfo.productName }}
              />

              <div className="flex flex-row items-start justify-between gap-4">
                {productId && quantity ? (
                  <Suspense fallback={<PriceDisplayFallback />}>
                    <PriceDisplay
                      token={token}
                      productId={productId}
                      quantity={quantity ?? 1}
                      unitOfMeasure={itemInfo.unitOfMeasure}
                    />
                  </Suspense>
                ) : (
                  <PriceDisplayFallback />
                )}
              </div>
            </div>
          </div>
        ) : (
          <Skeleton className="h-32" />
        )}

        <form>
          <Label htmlFor={jobNameId} className="sr-only">
            PO # / Job Name
          </Label>

          <Input
            {...register("poOrJobName", {
              onBlur: handleSave,
            })}
            id={jobNameId}
            type="text"
            placeholder="PO # / Job Name"
            className="hidden"
          />
        </form>

        <DialogFooter className="flex flex-row items-center gap-2">
          <Button
            variant="outline"
            className="btn-continue-shopping flex-1 border border-wurth-gray-400 font-bold shadow-md"
            onClick={closeDialog}
            data-button-action="Continue shopping"
          >
            Continue shopping
          </Button>

          <Button
            className="btn-view-cart flex-1 font-bold shadow-md"
            onClick={goToCart}
            asChild
          >
            <Link href="/cart" data-button-action="View Cart">
              Go to Cart
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;

const PriceDisplayFallback = () => {
  return (
    <>
      <Skeleton className="h-6 w-24" />

      <Skeleton className="h-7 w-14" />
    </>
  );
};

const PriceDisplay = ({
  token,
  productId,
  unitOfMeasure,
  quantity,
}: {
  readonly token: string;
  readonly productId: number;
  readonly unitOfMeasure: string;
  readonly quantity: number;
}) => {
  const priceCheckQuery = useSuspensePriceCheck(token, [
    { productId, qty: quantity },
  ]);
  const priceData = priceCheckQuery.data.productPrices[0];

  return (
    <>
      <div className="font-normal text-wurth-gray-800">
        <span className="text-base">
          ${formatNumberToPrice(priceData?.price)}
        </span>
        <span className="text-sm font-medium">/{unitOfMeasure}</span>
      </div>

      <div className="text-lg text-wurth-gray-800">
        ${formatNumberToPrice(priceData?.extendedPrice)}
      </div>
    </>
  );
};
