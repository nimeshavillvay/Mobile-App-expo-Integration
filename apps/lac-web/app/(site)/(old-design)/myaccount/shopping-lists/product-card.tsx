"use client";

import SaleBadges from "@/_components/sale-badges";
import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { GTM_ITEM_PAGE_TYPES } from "@/_lib/constants";
import { getGTMPageType } from "@/_lib/gtm-utils";
import type { GtmProduct } from "@/_lib/types";
import { cn, getBoolean } from "@/_lib/utils";
import { sendGTMEvent } from "@next/third-parties/google";
import {
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardPrice,
  ProductCard as ProductCardRoot,
} from "@repo/web-ui/components/product-card";
import { Button } from "@repo/web-ui/components/ui/button";
import { type ComponentProps } from "react";
import { MdOutlineDelete } from "react-icons/md";
import type { ShoppingListItemsElement } from "./type";
import useRemoveShoppingListItemMutation from "./use-remove-shopping-list-item-mutation.hook";

type ProductProps = {
  readonly orientation?: ComponentProps<typeof ProductCardRoot>["orientation"];
  readonly product: ShoppingListItemsElement;
  readonly listId: string;
  readonly stretchWidth?: boolean;
  readonly isNewItem?: boolean;
  readonly onSale?: boolean;
  readonly priceData: {
    listPrice: number;
    price: number;
    uomPrice?: number;
    uomPriceUnit?: string;
  };
  readonly gtmItemInfo: GtmProduct | undefined;
  readonly token: string;
};

const ProductCard = ({
  orientation,
  product,
  listId,
  stretchWidth = false,
  priceData,
  gtmItemInfo,
  token,
}: ProductProps) => {
  const id = product.productId;
  const title = product.itemName;
  const image = product.img;
  const sku = product.txtWurthLacItem;
  const onSale = getBoolean(product.onSale);
  const isNewItem = getBoolean(product.isNewItem);
  const href = `/product/${product.productId}/${product.slug}`;
  let uom = product.txtUom;

  const removeShoppingListItemMutation = useRemoveShoppingListItemMutation(
    parseInt(id),
  );

  const loginCheckResponse = useSuspenseCheckLogin(token);

  const showDiscount = loginCheckResponse.data?.status_code === "NOT_LOGGED_IN";

  const listPrice = priceData.listPrice;
  const currentPrice = priceData?.uomPrice ?? priceData?.price;
  if (priceData?.uomPriceUnit) {
    uom = priceData?.uomPriceUnit;
  }

  const discountPercent = Math.round(
    ((listPrice - currentPrice) / listPrice) * 100,
  );
  const isLaminateItem = !!priceData?.uomPrice && !!priceData?.uomPriceUnit;

  const { setOpen, setProductId } = useAddToCartDialog(
    (state) => state.actions,
  );

  const addToCart = () => {
    setProductId(parseInt(id));
    setOpen("verification");
  };

  const removeFromShoppingList = () => {
    removeShoppingListItemMutation.mutate({ listId, productId: id });
  };

  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  const gtmItemUserQuery = useGtmUser();
  const gtmUser = gtmItemUserQuery.data;
  const productTitleOrImageOnClick = () => {
    if (gtmItemInfo) {
      sendGTMEvent({
        event: "select_item",
        item_list_name: GTM_ITEM_PAGE_TYPES.SHOPPING_LIST,
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
    <ProductCardRoot
      orientation={orientation}
      className={cn(
        "shrink-0 snap-start",
        orientation === "horizontal" && "w-full",
        stretchWidth && "md:w-full",
      )}
    >
      <ProductCardHero>
        <div className="flex flex-row justify-between gap-2 @container/labels">
          {!isLaminateItem && discountPercent > 0 && showDiscount ? (
            <ProductCardDiscount>{discountPercent}</ProductCardDiscount>
          ) : (
            <div className="invisible md:text-lg">0</div>
          )}

          {orientation === "vertical" && (
            <SaleBadges
              onSale={onSale}
              isNewItem={isNewItem}
              showFlashDealText={!(discountPercent > 0 && onSale && isNewItem)}
            />
          )}
        </div>
        {!!image && !!title && (
          <ProductCardImage
            src={image}
            alt={title}
            href={href}
            title={title}
            productTitleOrImageOnClick={productTitleOrImageOnClick}
          />
        )}
      </ProductCardHero>

      <ProductCardContent>
        {orientation === "horizontal" && (
          <div className="@container/labels">
            <SaleBadges
              onSale={onSale}
              isNewItem={isNewItem}
              showFlashDealText={true}
            />
          </div>
        )}

        {!!sku && !!title && (
          <ProductCardDetails
            title={title}
            sku={sku}
            href={href}
            productTitleOrImageOnClick={productTitleOrImageOnClick}
          />
        )}

        <>
          {!!uom && (
            <ProductCardPrice
              price={currentPrice}
              uom={uom}
              actualPrice={listPrice}
              isLaminateItem={isLaminateItem}
              showDiscount={showDiscount}
            />
          )}

          <ShoppingListProductCardActions
            addToCart={addToCart}
            removeFromShoppingList={removeFromShoppingList}
          />
        </>
      </ProductCardContent>
    </ProductCardRoot>
  );
};

export default ProductCard;

const ShoppingListProductCardActions = ({
  addToCart,
  removeFromShoppingList,
  disabled = false,
}: {
  readonly addToCart: () => void;
  readonly removeFromShoppingList: () => void;
  readonly disabled?: boolean;
}) => {
  return (
    <div className="mt-auto flex flex-row items-center gap-1 md:gap-2">
      <Button
        variant="outline"
        size="icon"
        className="size-10"
        aria-label="Add to List"
        onClick={removeFromShoppingList}
        disabled={disabled}
        data-button-action="Shopping List Remove From List"
      >
        <MdOutlineDelete
          className="size-4 fill-black"
          data-button-action="Shopping List Remove From List"
        />
      </Button>

      <Button
        className="h-10 max-h-full flex-1 px-4 text-[0.875rem] leading-5"
        onClick={addToCart}
        disabled={disabled}
        data-button-action="Shopping List Open Add to Cart Dialog"
      >
        Add to cart
      </Button>
    </div>
  );
};
