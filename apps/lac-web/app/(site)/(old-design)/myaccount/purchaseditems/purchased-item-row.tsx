import ProductNotAvailable from "@/_components/product-not-available";
import Warning from "@/_components/warning";
import WurthLacLogo from "@/_components/wurth-lac-logo";
import useAddToCartMutation from "@/_hooks/cart/use-add-to-cart-mutation.hook";
import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import useItemInfo from "@/_hooks/product/use-item-info.hook";
import useSuspenseProductExcluded from "@/_hooks/product/use-suspense-product-excluded.hook";
import { GTM_ITEM_PAGE_TYPES } from "@/_lib/constants";
import { getGTMPageType } from "@/_lib/gtm-utils";
import type { GtmProduct } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import ErrorBoundary from "@/old/_components/error-boundary";
import { Button } from "@/old/_components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/old/_components/ui/collapsible";
import { Input } from "@/old/_components/ui/input";
import { Label } from "@/old/_components/ui/label";
import { TableCell, TableRow } from "@/old/_components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendGTMEvent } from "@next/third-parties/google";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useId, useState, type ComponentProps } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";
import * as z from "zod";
import ItemAttributes from "./_item-attributes/item-attributes";
import ItemPrices from "./_item-prices/item-prices";
import { generateItemUrl, isItemError } from "./client-helpers";
import { DATE_FORMAT } from "./constants";
import ErrorAlert from "./error-alert";
import FavoriteButton from "./favorite-button";
import type { DetailedPurchasedItem } from "./types";

type PurchasedItemRowProps = {
  readonly token: string;
  readonly item: DetailedPurchasedItem;
  readonly index: number;
  readonly prices: ComponentProps<typeof ItemPrices>["prices"];
  readonly gtmItemInfo: GtmProduct | undefined;
  readonly isFavorite?: boolean;
  readonly favoriteListIds?: string[];
};

const PurchasedItemRow = ({
  token,
  item,
  index,
  prices,
  gtmItemInfo,
  isFavorite,
  favoriteListIds,
}: PurchasedItemRowProps) => {
  const [showItemAttributes, setShowItemAttributes] = useState(false);
  const [showMyPrice, setShowMyPrice] = useState(false);

  const id = useId();
  const quantityId = `quantity-${id}`;
  const formId = `purchase-add-to-cart-form-${id}`;

  const { setQuantity } = useAddToCartDialog((state) => state.actions);

  const schema = z.object({
    quantity: z
      .number()
      .int()
      .min(item.minimumOrderQuantity, {
        message: `Please consider minimum order quantity of: ${item.minimumOrderQuantity}`,
      })
      .multipleOf(item.quantityByIncrements, {
        message: `This product is sold in multiples of: ${item.quantityByIncrements}`,
      })
      .nullable(),
  });
  type Schema = z.infer<typeof schema>;

  const methods = useForm<Schema>({
    values: { quantity: null },
    resolver: zodResolver(schema),
  });

  const quantity = methods.watch("quantity");

  const addToCartMutation = useAddToCartMutation({
    productId: item.productId,
  });

  const [isNotAvailableProduct, setIsNotAvailableProduct] = useState(false);

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
          onSuccess: (data) => {
            if (data === undefined) {
              setIsNotAvailableProduct(true);
            }
            // Reset the form after submission
            methods.reset();
          },
        },
      );
    }
  });

  const productExcludedQuery = useSuspenseProductExcluded(
    token,
    item.productId,
  );

  const isRegionalExcluded = productExcludedQuery.data.isExcluded;

  const isEligible = (item: DetailedPurchasedItem) => {
    return (
      item &&
      item.productSku &&
      item.productStatus !== "DL" &&
      !item.isDiscontinued
    );
  };

  const isItemNotAdded = !item.productSku;
  const isValidQuantity = !!(quantity && quantity >= 1);

  const itemInfoQuery = useItemInfo([item.productId]);
  const itemInfo = itemInfoQuery.data?.[0];

  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  const gtmItemUserQuery = useGtmUser();
  const gtmUser = gtmItemUserQuery.data;

  const sendToGTM = () => {
    if (gtmItemInfo) {
      sendGTMEvent({
        event: "select_item",
        item_list_name: GTM_ITEM_PAGE_TYPES.PURCHASE_HISTORY,
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
        page_type: getGTMPageType(
          pathnameHistory[pathnameHistory.length - 1] ?? "",
        ),
      });
    }
  };

  return (
    <>
      <TableRow
        key={`${index}_0`}
        className={cn(
          "border-b-0",
          index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
        )}
      >
        <TableCell className="min-w-[76px]">
          <Link
            href={generateItemUrl(item)}
            onClick={sendToGTM}
            className={cn(
              isItemError(item) ? "pointer-events-none" : "pointer-events-auto",
              "btn-view-product btnAction btn-product-detail-img",
            )}
            data-btn-action="View Product"
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.productTitle}
                width={76}
                height={76}
                className="border border-brand-gray-200 object-contain"
              />
            ) : (
              <WurthLacLogo
                width={76}
                height={76}
                className="border border-brand-gray-200 px-2"
              />
            )}
          </Link>
        </TableCell>

        <TableCell className="flex flex-col gap-0.5">
          <Link
            href={generateItemUrl(item)}
            onClick={sendToGTM}
            className={cn(
              "btn-view-product btnAction product-title btn-product-detail text-sm text-brand-gray-500",
              isItemError(item) ? "pointer-events-none" : "pointer-events-auto",
            )}
            data-btn-action="View Product"
          >
            Item# : {item.productSku !== "" ? item.productSku : "N/A"}
          </Link>

          {!isItemNotAdded && (
            <>
              <div className="text-sm text-brand-gray-500">
                MRF Part# : {item.mfrPartNo !== "" ? item.mfrPartNo : "N/A"}
              </div>

              <h4
                className="line-clamp-3 text-wrap font-bold"
                dangerouslySetInnerHTML={{ __html: item.productTitle }}
              />

              <div className="text-sm text-brand-gray-500">
                Category :&nbsp;
                {item.productCategory !== "" ? item.productCategory : "N/A"}
              </div>
            </>
          )}
        </TableCell>

        <TableCell className="min-w-[76px]">
          {item.purchaseOrderDate
            ? dayjs(item.purchaseOrderDate).format(DATE_FORMAT)
            : "N/A"}
        </TableCell>

        <TableCell className="flex flex-col gap-0.5">
          {item.totalItem ?? "N/A"}
        </TableCell>

        <TableCell rowSpan={2}>
          <Collapsible
            open={showMyPrice}
            onOpenChange={setShowMyPrice}
            disabled={isItemError(item)}
            className="min-w-[260px]"
          >
            <CollapsibleTrigger
              className={cn(
                "group mx-auto flex cursor-pointer flex-row items-center justify-center text-sm",
                isItemError(item)
                  ? "cursor-not-allowed text-brand-gray-400"
                  : "cursor-pointer text-brand-primary",
              )}
            >
              <span>{showMyPrice ? "Hide" : "Show"} my price</span>

              <MdKeyboardArrowDown className="text-lg leading-none transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <ItemPrices
                quantity={item.minimumOrderQuantity}
                uom={item.unitOfMeasure}
                listPrice={item.listPrice}
                showUnitPrice={true}
                prices={prices}
              />
            </CollapsibleContent>
          </Collapsible>
        </TableCell>

        <TableCell className="text-sm text-brand-gray-500" colSpan={2}>
          {item.unitOfMeasure !== "" ? item.unitOfMeasure : "N/A"}
        </TableCell>

        <TableCell className="flex flex-col gap-0.5 pb-0 text-sm text-brand-gray-500">
          <FormProvider {...methods}>
            <form id={formId} onSubmit={onSubmit}>
              <Label htmlFor={quantityId} className="sr-only">
                Quantity
              </Label>
              <Input
                id={quantityId}
                type="number"
                className={cn(
                  "h-6 w-16 px-1 text-right text-base leading-4",
                  !!methods.formState.errors.quantity?.message &&
                    "border-wurth-red-650",
                )}
                disabled={addToCartMutation.isPending || isItemError(item)}
                {...methods.register("quantity", {
                  valueAsNumber: true,
                })}
              />
              {!!methods.formState.errors.quantity?.message && (
                <div className="text-wurth-red-650">
                  {methods.formState.errors.quantity?.message}
                </div>
              )}
              {!isItemError(item) && (
                <>
                  <div className="text-nowrap">
                    <span className="font-bold text-black">Min: </span>
                    {item.minimumOrderQuantity}
                  </div>

                  <div className="text-nowrap">
                    <span className="font-bold text-black">Multiples: </span>
                    {item.quantityByIncrements}
                  </div>
                </>
              )}
            </form>
          </FormProvider>

          {isEligible(item) && (
            <div className="flex flex-row items-end justify-end gap-2">
              <Button
                type="submit"
                className="w-[170px]"
                disabled={!isValidQuantity || addToCartMutation.isPending}
                form={formId}
                data-button-action="Purchase Items Add to Cart"
              >
                Add to cart
              </Button>

              <FavoriteButton
                productId={item.productId}
                token={token}
                isFavorite={isFavorite}
                favoriteListIds={favoriteListIds}
              />
            </div>
          )}

          {isItemError(item) && <ErrorAlert item={item} />}
        </TableCell>
      </TableRow>

      {isNotAvailableProduct && (
        <TableRow
          key="error"
          className={cn(
            "border-b-0",
            index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
          )}
        >
          <TableCell />
          <TableCell
            colSpan={3}
            className="flex flex-col gap-0.5 pb-0 text-sm text-brand-gray-500"
          >
            <ProductNotAvailable />
          </TableCell>
          <TableCell colSpan={6} />
        </TableRow>
      )}

      {isRegionalExcluded && (
        <TableRow
          key="reginal-exclude-error"
          className={cn(
            "border-b-0",
            index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
          )}
        >
          <TableCell />
          <TableCell
            colSpan={3}
            className="flex flex-col gap-0.5 pb-0 text-sm text-brand-gray-500"
          >
            <Warning
              title="Not Available"
              description="This item is not available in your territory."
            />
          </TableCell>
          <TableCell colSpan={6} />
        </TableRow>
      )}

      <TableRow
        key={`${index}_1`}
        className={cn(
          "border-b-0",
          index % 2 === 0 ? "bg-white" : "bg-brand-gray-100",
        )}
      >
        <TableCell />
        <TableCell colSpan={3} className={isEligible(item) ? "py-2" : ""}>
          <Collapsible
            open={showItemAttributes}
            onOpenChange={setShowItemAttributes}
            disabled={isItemNotAdded || !itemInfo}
          >
            <CollapsibleTrigger
              className={cn(
                "group flex flex-row items-center text-sm",
                isItemNotAdded
                  ? "cursor-not-allowed text-brand-gray-400"
                  : "cursor-pointer text-brand-primary",
              )}
            >
              <span>
                {showItemAttributes ? "Hide" : "View"} item attributes
              </span>

              <MdKeyboardArrowDown className="text-lg leading-none transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <ErrorBoundary
                fallback={
                  <div className="p-4 text-center text-brand-primary">
                    Failed to Load Attributes!!!
                  </div>
                }
              >
                <ItemAttributes productId={item.productId} />
              </ErrorBoundary>
            </CollapsibleContent>
          </Collapsible>
        </TableCell>

        <TableCell colSpan={4} />
      </TableRow>
    </>
  );
};

export default PurchasedItemRow;
