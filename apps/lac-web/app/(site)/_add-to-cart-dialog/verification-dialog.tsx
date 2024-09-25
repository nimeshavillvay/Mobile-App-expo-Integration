"use client";

import AvailabilityStatus from "@/_components/availability-status";
import NumberInputField from "@/_components/number-input-field";
import ProductNotAvailable from "@/_components/product-not-available";
import QuantityWarning from "@/_components/quantity-warning";
import useSuspenseWillCallPlant from "@/_hooks/address/use-suspense-will-call-plant.hook";
import useAddToCartMutation from "@/_hooks/cart/use-add-to-cart-mutation.hook";
import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import useItemInfo from "@/_hooks/product/use-item-info.hook";
import useSuspenseCheckAvailability from "@/_hooks/product/use-suspense-check-availability.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { MAX_QUANTITY, NOT_AVAILABLE } from "@/_lib/constants";
import { getGTMItemListPage, getGTMPageType } from "@/_lib/gtm-utils";
import {
  calculateIncreaseQuantity,
  calculateReduceQuantity,
  cn,
  formatNumberToPrice,
} from "@/_lib/utils";
import { NUMBER_TYPE } from "@/_lib/zod-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendGTMEvent } from "@next/third-parties/google";
import { AddToCart as AddToCartIcon } from "@repo/web-ui/components/icons/add-to-cart";
import { ChevronRight } from "@repo/web-ui/components/icons/chevron-right";
import { Minus } from "@repo/web-ui/components/icons/minus";
import { Plus } from "@repo/web-ui/components/icons/plus";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/web-ui/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/web-ui/components/ui/dialog";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useDeferredValue, useId } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { z } from "zod";

const verificationDialogSchema = z.object({
  poOrJobName: z.string(),
  quantity: NUMBER_TYPE,
});
type VerificationDialogSchema = z.infer<typeof verificationDialogSchema>;

type VerificationDialogProps = {
  readonly token: string;
};

const VerificationDialog = ({ token }: VerificationDialogProps) => {
  const id = useId();
  const jobNameId = `job-name-${id}`;
  const formId = `add-to-cart-form-${id}`;

  const open = useAddToCartDialog((state) => state.open);
  const productId = useAddToCartDialog((state) => state.productId);
  const { setOpen } = useAddToCartDialog((state) => state.actions);

  const onOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      addToCartForm.reset({
        poOrJobName: "",
        quantity: itemInfo?.minimumOrderQuantity ?? 1,
      });
      setOpen("closed");
    } else {
      setOpen(open);
    }
  };

  const itemInfoQuery = useItemInfo(productId ? [productId] : []);
  const itemInfo = itemInfoQuery.data?.[0];

  const addToCartForm = useForm<VerificationDialogSchema>({
    values: {
      poOrJobName: "",
      quantity: itemInfo?.minimumOrderQuantity ?? -1,
      // The placeholder is set to -1 to prevent the QuantityWarning component
      // from showing when the dialog is opened
    },
    resolver: zodResolver(verificationDialogSchema),
  });
  const quantity = addToCartForm.watch("quantity");
  const delayedQuantity = useDebouncedState(quantity);
  const deferredQuantity = useDeferredValue(delayedQuantity);

  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  const gtmItemInfoQuery = useGtmProducts(
    productId ? [{ productid: productId, cartid: 0 }] : [],
  );
  const gtmItemInfo = gtmItemInfoQuery.data?.[0];

  const gtmItemUserQuery = useGtmUser();
  const gtmUser = gtmItemUserQuery.data;

  const sendToGTM = () => {
    setOpen("closed");
    if (gtmItemInfo) {
      sendGTMEvent({
        event: "select_item",
        item_list_name: getGTMItemListPage(
          pathnameHistory[pathnameHistory.length - 1] ?? "",
        ),
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
              quantity: Number(deferredQuantity),
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

  return (
    <FormProvider {...addToCartForm}>
      <Dialog open={open === "verification"} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[31.625rem]">
          <DialogHeader className="sr-only">
            <DialogTitle>Add item to cart</DialogTitle>

            <DialogDescription>
              Choose the quantity and add the item to the cart
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-5">
            {itemInfo ? (
              <div className="flex flex-row items-start gap-4">
                <Link
                  href={`/product/${itemInfo.productId}/${itemInfo.slug}`}
                  onClick={sendToGTM}
                  className="btn-view-product btnAction btn-product-detail-img"
                  data-btn-action="View Product"
                >
                  <Image
                    src={itemInfo.image}
                    alt={`An image of ${itemInfo.productName}`}
                    width={180}
                    height={180}
                    className="shrink-0 rounded object-contain"
                  />
                </Link>

                <div className="space-y-2">
                  <div className="space-y-1">
                    <Link
                      href={`/product/${itemInfo.productId}/${itemInfo.slug}`}
                      className="btn-view-product btnAction product-title btn-product-detail"
                      data-btn-action="View Product"
                      onClick={sendToGTM}
                    >
                      <h3
                        className="text-base text-black"
                        dangerouslySetInnerHTML={{
                          __html: itemInfo.productName,
                        }}
                      />
                    </Link>
                    <h4 className="text-sm font-medium text-wurth-gray-500">
                      {itemInfo.productSku}
                    </h4>
                  </div>

                  {productId ? (
                    <Suspense fallback={<Skeleton className="h-20" />}>
                      <PriceCheck
                        token={token}
                        productId={productId}
                        uom={itemInfo.unitOfMeasure}
                        quantity={Number(deferredQuantity)}
                      />
                    </Suspense>
                  ) : (
                    <Skeleton className="h-20" />
                  )}
                </div>
              </div>
            ) : (
              <Skeleton className="h-60" />
            )}

            <div className="flex flex-col gap-2">
              {itemInfo ? (
                <Suspense
                  fallback={<Skeleton className="h-[2.625rem] rounded-lg" />}
                >
                  <LocationStocks
                    token={token}
                    productId={itemInfo.productId}
                    quantity={deferredQuantity}
                  />
                </Suspense>
              ) : (
                <Skeleton className="h-[2.625rem] rounded-lg" />
              )}

              <div>
                <Label htmlFor={jobNameId} className="sr-only">
                  PO # / Job Name
                </Label>

                <Input
                  {...addToCartForm.register("poOrJobName")}
                  id={jobNameId}
                  form={formId}
                  type="text"
                  placeholder="PO # / Job Name"
                />
              </div>

              {itemInfo ? (
                <div className="flex flex-row items-center gap-4 text-sm text-wurth-gray-500">
                  <div>
                    Min Order:{" "}
                    <span className="text-wurth-gray-800">
                      {itemInfo.minimumOrderQuantity}
                    </span>
                  </div>

                  <div>
                    Quantity Multiple by:{" "}
                    <span className="text-wurth-gray-800">
                      {itemInfo.quantityByIncrements}
                    </span>
                  </div>
                </div>
              ) : (
                <Skeleton className="h-5 w-2/3" />
              )}

              {!!itemInfo && quantity >= 0 && (
                <QuantityWarning
                  quantity={quantity}
                  minimumQuantity={itemInfo.minimumOrderQuantity}
                  incrementQuantity={itemInfo.quantityByIncrements}
                />
              )}

              {itemInfo ? (
                <Suspense fallback={<Skeleton className="h-[3.75rem]" />}>
                  <AddToCart
                    token={token}
                    productId={itemInfo.productId}
                    minAmount={itemInfo.minimumOrderQuantity}
                    increments={itemInfo.quantityByIncrements}
                    formId={formId}
                    uom={itemInfo.unitOfMeasure}
                  />
                </Suspense>
              ) : (
                <Skeleton className="h-[3.75rem]" />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default VerificationDialog;

const PriceCheck = ({
  token,
  productId,
  uom,
  quantity,
}: {
  readonly token: string;
  readonly productId: number;
  readonly uom: string;
  readonly quantity: number;
}) => {
  const priceCheckQuery = useSuspensePriceCheck(token, [
    { productId, qty: quantity },
  ]);
  const priceData = priceCheckQuery.data.productPrices[0];

  const initialPriceCheckQuery = useSuspensePriceCheck(token, [
    { productId, qty: 1 },
  ]);

  const initialPriceData = initialPriceCheckQuery.data.productPrices[0];
  const initialPrice =
    initialPriceData?.uomPrice ?? initialPriceData?.price ?? 0;
  const isLaminateItem = !!priceData?.uomPrice && !!priceData?.uomPriceUnit;
  const displayUom = initialPriceData?.uomPriceUnit ?? uom;

  const isDiscounted =
    priceData?.price &&
    priceData?.listPrice &&
    priceData?.price < priceData?.listPrice;

  const loginCheckResponse = useSuspenseCheckLogin(token);

  const showDiscount = loginCheckResponse.data?.status_code === "NOT_LOGGED_IN";

  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm leading-none text-wurth-gray-800">
        <span
          className={
            !isLaminateItem && isDiscounted && showDiscount
              ? "text-green-700"
              : "text-inherit"
          }
        >
          $
          <span
            className={cn(
              "mr-1 text-xl font-medium leading-7 tracking-[-0.1px]",
            )}
          >
            {formatNumberToPrice(priceData?.uomPrice ?? priceData?.price)}
          </span>
        </span>
        {!isLaminateItem && isDiscounted && showDiscount && (
          <span className="text-base leading-6 text-wurth-gray-400 line-through">
            {formatNumberToPrice(priceData?.listPrice)}
          </span>
        )}
        <span>/{displayUom}</span>
      </div>

      <div className="grid grid-cols-2 gap-0.5">
        {priceData?.priceBreakDowns.map((item) => (
          <div
            key={item.quantity}
            className="rounded-lg bg-wurth-gray-50 px-3 py-1 odd:rounded-r-none last:odd:rounded-r-lg even:rounded-l-none"
          >
            <h5 className="text-xs font-medium leading-5 text-wurth-gray-800">
              {item.quantity} items
            </h5>

            <div className="text-xs text-wurth-gray-800">
              <span className="text-sm">
                ${formatNumberToPrice(Math.min(item.price, initialPrice))}
              </span>
              /{uom}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddToCart = ({
  token,
  productId,
  minAmount,
  increments,
  formId,
  uom,
}: {
  readonly token: string;
  readonly productId: number;
  readonly minAmount: number;
  readonly increments: number;
  readonly formId: string;
  readonly uom: string;
}) => {
  const { watch, setValue, handleSubmit, control } =
    useFormContext<VerificationDialogSchema>();
  const { setQuantity } = useAddToCartDialog((state) => state.actions);

  const quantity = watch("quantity");

  const reduceQuantity = () => {
    // Use `Number(quantity)` because `quantity` is a string at runtime
    setValue(
      "quantity",
      calculateReduceQuantity(Number(quantity), minAmount, increments),
    );
  };
  const increaseQuantity = () => {
    // Use `Number(quantity)` because `quantity` is a string at runtime
    setValue(
      "quantity",
      calculateIncreaseQuantity(Number(quantity), minAmount, increments),
    );
  };

  const addToCartMutation = useAddToCartMutation({
    productId,
  });

  const onSubmit = handleSubmit((data) => {
    // Update the quantity in add to cart dialog
    setQuantity(data.quantity);

    addToCartMutation.mutate({
      quantity: data.quantity,
      poOrJobName: data.poOrJobName,
    });
  });

  const checkAvailabilityQuery = useSuspenseCheckAvailability(token, {
    productId,
    qty: 1,
  });
  const disableAddToCartButton =
    checkAvailabilityQuery.data.status === NOT_AVAILABLE;

  return (
    <form
      className="flex flex-row items-stretch gap-2"
      id={formId}
      onSubmit={onSubmit}
    >
      <div className="flex-[4] rounded-md border border-wurth-gray-250 p-0.5 md:flex-1">
        <div className="text-center text-xs font-medium uppercase leading-none text-wurth-gray-400">
          Qty / {uom}
        </div>

        <div className="flex flex-row items-center justify-between gap-2 shadow-sm">
          <Button
            type="button"
            variant="subtle"
            size="icon"
            className="up-minus up-control size-10 rounded-sm"
            onClick={reduceQuantity}
            disabled={
              !quantity ||
              Number(quantity) === minAmount ||
              addToCartMutation.isPending ||
              disableAddToCartButton
            }
          >
            <Minus
              className="btnAction size-4"
              data-button-action="Decrease Quantity"
            />
            <span className="sr-only">Reduce quantity</span>
          </Button>

          <Controller
            control={control}
            name="quantity"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <NumberInputField
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                ref={ref}
                name={name}
                disabled={addToCartMutation.isPending || disableAddToCartButton}
                required
                min={minAmount}
                step={increments}
                className="md:w-[6.125rem]"
                label="Quantity"
                //  eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
              />
            )}
          />

          <Button
            type="button"
            variant="subtle"
            size="icon"
            className="up-plus up-control size-10 rounded-sm"
            onClick={increaseQuantity}
            disabled={
              quantity?.toString().length > 5 ||
              addToCartMutation.isPending ||
              disableAddToCartButton ||
              Number(quantity) + increments >= MAX_QUANTITY
            }
          >
            <Plus className="size-4" data-button-action="Increase Quantity" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        variant="secondary"
        className="h-full flex-[5] gap-2 rounded-lg px-5 py-4 shadow-md md:flex-[2]"
        disabled={addToCartMutation.isPending || disableAddToCartButton}
      >
        <AddToCartIcon
          className="stroke-white"
          data-button-action="Add to cart from Dialog"
        />

        <span className="text-lg font-semibold">Add to cart</span>
      </Button>
    </form>
  );
};

const LocationStocks = ({
  token,
  productId,
  quantity,
}: {
  readonly token: string;
  readonly productId: number;
  readonly quantity: number;
}) => {
  const checkAvailabilityQuery = useSuspenseCheckAvailability(token, {
    productId,
    qty: quantity,
  });
  const firstLocation = checkAvailabilityQuery.data.availableLocations[0];

  const checkLoginQuery = useSuspenseCheckLogin(token);

  const willCallPlantQuery = useSuspenseWillCallPlant(token);

  const willCallPlant = willCallPlantQuery.data;
  const willCallPlantCode = willCallPlant?.plantCode;
  const { availableLocations, backorderLocation } = checkAvailabilityQuery.data;

  const homeBranch = availableLocations?.find(
    (location) => location.location === willCallPlantCode,
  );
  const otherLocations = availableLocations?.filter(
    ({ location }) => location !== willCallPlantCode,
  );
  const isNotInStock = homeBranch === undefined || homeBranch?.amount === 0;
  const isLimitedStock = (homeBranch?.amount ?? 0) < quantity;

  const backOrderDate =
    checkAvailabilityQuery.data.options[0]?.plants[0]?.backOrderDate;

  // If there isn't even one location returned, hide the component
  if (
    !firstLocation &&
    otherLocations.length === 0 &&
    checkAvailabilityQuery.data.status === NOT_AVAILABLE
  ) {
    return <ProductNotAvailable />;
  }

  return (
    <Collapsible className="flex flex-col gap-1">
      <div className="flex flex-row flex-wrap items-center justify-between gap-2 rounded-lg bg-wurth-gray-50 p-2">
        <AvailabilityStatus
          amount={firstLocation?.amount ?? 0}
          backOrderDate={backOrderDate ?? ""}
          isHomeBranch={!!homeBranch}
          isLimitedStock={isLimitedStock}
          isNotInStock={isNotInStock}
          location={firstLocation?.name ?? ""}
          xPlant={willCallPlant.plantName}
          isNotStocked={backorderLocation !== willCallPlantCode}
        />
      </div>
      {checkLoginQuery.data?.status_code === "OK" &&
        !isNotInStock &&
        otherLocations.length > 0 && (
          <div className="items-center gap-2 rounded-lg bg-wurth-gray-50 p-2">
            <CollapsibleTrigger
              asChild
              className="group h-fit gap-1 p-0 pl-1 text-sm font-bold text-black"
            >
              <Button variant="subtle">
                <span>Check Other Stores</span>
                <ChevronRight
                  width={16}
                  height={16}
                  className="transition duration-150 ease-out group-data-[state=open]:rotate-90"
                  data-button-action="Check Other Stores"
                />
              </Button>
            </CollapsibleTrigger>
          </div>
        )}

      <CollapsibleContent>
        <table className="w-full border-separate rounded-lg border border-wurth-gray-150 [&_td]:p-3 [&_th]:p-3">
          <thead className="">
            <tr className="text-sm text-wurth-gray-500">
              <th className="border-b border-b-wurth-gray-150 text-left font-normal">
                Location
              </th>
              <th className="border-b border-b-wurth-gray-150 text-right font-normal">
                Stock
              </th>
            </tr>
          </thead>

          <tbody>
            {otherLocations.map((location) => (
              <tr
                key={location.location}
                className="text-sm text-wurth-gray-800 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-b-wurth-gray-150"
              >
                <td className="text-left font-normal">{location.name}</td>

                <td className="text-right font-normal">{location.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CollapsibleContent>
    </Collapsible>
  );
};
