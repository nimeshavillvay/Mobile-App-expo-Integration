import Warning from "@/_components/warning";
import WurthLacLogo from "@/_components/wurth-lac-logo";
import useAddToCartMutation from "@/_hooks/cart/use-add-to-cart-mutation.hook";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import useSuspenseCheckAvailability from "@/_hooks/product/use-suspense-check-availability.hook";
import useSuspenseProductExcluded from "@/_hooks/product/use-suspense-product-excluded.hook";
import { NOT_AVAILABLE } from "@/_lib/constants";
import { cn } from "@/_lib/utils";
import AddToCartIcon from "@/old/_components/icons/add-to-cart";
import Separator from "@/old/_components/separator";
import { Button } from "@/old/_components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/old/_components/ui/collapsible";
import { Dialog, DialogContent } from "@/old/_components/ui/dialog";
import { Input } from "@/old/_components/ui/input";
import { Label } from "@/old/_components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useId,
  useState,
  type ComponentProps,
  type Dispatch,
  type SetStateAction,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import * as z from "zod";
import ItemPrices from "./_item-prices/item-prices";
import { generateItemUrl, isItemError } from "./client-helpers";
import { DATE_FORMAT } from "./constants";
import ErrorAlert from "./error-alert";
import MobileFavoriteButton from "./mobile-favorite-button";
import type { DetailedPurchasedItem } from "./types";

const schema = z.object({
  quantity: z.number().int().min(1).nullable(),
});

type Schema = z.infer<typeof schema>;

type ActionConfirmationDialogProps = {
  readonly open: boolean;
  readonly onOpenChange: Dispatch<SetStateAction<boolean>>;
  readonly item: DetailedPurchasedItem;
  readonly token: string;
  readonly prices: ComponentProps<typeof ItemPrices>["prices"];
  readonly isFavorite?: boolean;
  readonly favoriteListIds?: string[];
};

const PurchasedItemDetailedViewDialog = ({
  open,
  onOpenChange,
  item,
  token,
  prices,
  isFavorite,
  favoriteListIds,
}: ActionConfirmationDialogProps) => {
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const id = useId();
  const quantityId = `quantity-${id}`;
  const formId = `purchase-add-to-cart-mobile-form-${id}`;
  const router = useRouter();

  const { setQuantity } = useAddToCartDialog((state) => state.actions);

  const methods = useForm<Schema>({
    values: { quantity: null },
    resolver: zodResolver(schema),
  });

  const quantity = methods.watch("quantity");

  const addToCartMutation = useAddToCartMutation({
    productId: item.productId,
  });

  const onSubmit = methods.handleSubmit((data) => {
    const quantity = data.quantity;
    if (quantity) {
      // Update the quantity in add to cart dialog
      setQuantity(quantity);

      addToCartMutation.mutate(
        {
          quantity: quantity,
        },
        {
          onSuccess: () => {
            // Reset the form after submission
            methods.reset();
          },
        },
      );
    }
  });

  const isItemNotAdded = !item.productSku;
  const isValidQuantity = !!(quantity && quantity >= 1);

  const checkAvailabilityQuery = useSuspenseCheckAvailability(token, {
    productId: item.productId,
    qty: 1,
  });
  const disableAddToCartButton =
    checkAvailabilityQuery.data.status === NOT_AVAILABLE;

  const productExcludedQuery = useSuspenseProductExcluded(
    token,
    item.productId,
  );
  const isRegionalExcluded = productExcludedQuery.data.isExcluded;

  return (
    <FormProvider {...methods}>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          if (!open) {
            setShowPriceBreakdown(false);
            methods.reset();
          }
          onOpenChange(open);
        }}
      >
        <DialogContent className="bottom-0 top-auto max-w-[768px] translate-y-[0%] gap-0 py-8 md:bottom-auto md:top-[50%] md:translate-y-[-50%]">
          <div className="flex flex-col gap-4 px-6 text-brand-gray-500">
            <div className="flex flex-row gap-4">
              <Link
                href={generateItemUrl(item)}
                className="btnAction min-w-[92px]"
                data-button-action="View Product"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.productTitle}
                    width={92}
                    height={92}
                    className="size-[92px] border border-brand-gray-200 object-contain"
                  />
                ) : (
                  <WurthLacLogo
                    width={92}
                    height={92}
                    className="border border-brand-gray-200 px-2"
                  />
                )}
              </Link>

              <div className="flex flex-col">
                {item.productCategory && (
                  <div className="text-base">{item.productCategory}</div>
                )}

                <h4
                  className="line-clamp-6 text-wrap font-bold text-black"
                  dangerouslySetInnerHTML={{ __html: item.productTitle }}
                />
              </div>
            </div>

            <div className="flex flex-row gap-2 rounded-sm bg-brand-gray-100 p-3">
              <div className="flex-1">
                <div className="text-nowrap text-sm">Last Order Date</div>
                <div className="font-bold">
                  {item.purchaseOrderDate
                    ? dayjs(item.purchaseOrderDate).format(DATE_FORMAT)
                    : "N/A"}
                </div>
              </div>

              <div className="flex-1">
                <div className="text-nowrap text-sm">Order Count</div>
                <div className="font-bold">{item.totalItem ?? "N/A"}</div>
              </div>
            </div>
            {isRegionalExcluded && (
              <Warning
                title="Not Available"
                description="This item is not available in your territory."
              />
            )}
            {isItemError(item) && <ErrorAlert item={item} />}

            <div className="flex flex-row gap-2 p-3">
              <div className="flex-1">
                <div className="text-sm">Item #</div>
                <div className="font-bold">
                  {item.productSku !== "" ? item.productSku : "N/A"}
                </div>
              </div>

              <div className="flex-1">
                <div className="text-sm">Manufacture Part #</div>
                <div className="font-bold">
                  {item.mfrPartNo !== "" ? item.mfrPartNo : "N/A"}
                </div>
              </div>
            </div>
          </div>

          <Separator
            orientation="horizontal"
            className="h-px flex-1 bg-brand-gray-200"
          />

          <div className="max-h-[300px] overflow-y-scroll">
            <div className="flex flex-row gap-2 px-6 py-4 text-brand-gray-500">
              <div className="flex-1">
                {!isItemNotAdded && (
                  <>
                    <ItemPrices
                      quantity={item.minimumOrderQuantity}
                      uom={item.unitOfMeasure}
                      listPrice={item.listPrice}
                      unitPriceOnly
                      prices={prices}
                    />

                    <Button
                      variant="ghost"
                      className="flex h-10 w-full items-center justify-between rounded-sm border border-brand-gray-300 px-2 font-normal capitalize"
                      onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                      disabled={isItemError(item) || disableAddToCartButton}
                      data-button-action="Purchase Items View Price Breakdown"
                    >
                      <span>Price Breakdown</span>
                      <MdKeyboardArrowRight className="text-2xl leading-none" />
                    </Button>
                  </>
                )}
              </div>

              <div className="flex-1 self-end">
                <div className="mb-1 text-sm">
                  Min:{item.minimumOrderQuantity},&nbsp;Multiple:
                  {item.quantityByIncrements}
                </div>
                <div className="flex">
                  <Label htmlFor={quantityId} className="sr-only">
                    Quantity
                  </Label>

                  <Input
                    id={quantityId}
                    type="number"
                    className="h-10 rounded-r-none px-2 text-base"
                    placeholder="Qty"
                    step={item.quantityByIncrements}
                    {...methods.register("quantity", {
                      valueAsNumber: true,
                      min: item.minimumOrderQuantity,
                      disabled:
                        addToCartMutation.isPending ||
                        isItemError(item) ||
                        disableAddToCartButton,
                    })}
                  />

                  <div className="flex h-10 items-center rounded-r-sm border border-s-0 border-brand-gray-400 px-2">
                    {item.unitOfMeasure !== "" ? item.unitOfMeasure : "N/A"}
                  </div>
                </div>
              </div>
            </div>

            <Collapsible
              open={showPriceBreakdown}
              onOpenChange={setShowPriceBreakdown}
              disabled={isItemError(item) || disableAddToCartButton}
            >
              <CollapsibleTrigger
                className={cn(
                  "group flex w-full flex-row items-center justify-between bg-brand-gray-100 px-6 py-4",
                  isItemError(item) ? "pointer-events-none opacity-50" : "",
                )}
              >
                <h4 className="font-wurth font-extrabold uppercase">
                  Price Breakdown
                </h4>

                <MdKeyboardArrowDown className="text-2xl leading-none transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="flex w-full justify-center">
                <ItemPrices
                  quantity={item.minimumOrderQuantity}
                  uom={item.unitOfMeasure}
                  listPrice={item.listPrice}
                  prices={prices}
                />
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Action Buttons Section */}
          <div className="flex flex-col gap-4 px-6 pt-6">
            <MobileFavoriteButton
              productId={item.productId}
              token={token}
              isFavorite={isFavorite}
              favoriteListIds={favoriteListIds}
            />

            <form
              id={formId}
              onSubmit={onSubmit}
              className="flex flex-row gap-4"
            >
              <Button
                variant="secondary"
                className="h-12 w-full flex-1 border-brand-primary text-brand-primary"
                disabled={item.slug === ""}
                onClick={() =>
                  router.push(`/product/${item.productId}/${item.slug}`)
                }
                data-button-action="Purchase Items View Product"
              >
                View Product
              </Button>

              <Button
                className="h-12 flex-1"
                disabled={
                  !isValidQuantity ||
                  addToCartMutation.isPending ||
                  disableAddToCartButton
                }
                data-button-action="Purchase Items Add to Cart"
              >
                <AddToCartIcon data-button-action="Purchase Items Add to Cart" />{" "}
                Add to Cart
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default PurchasedItemDetailedViewDialog;
