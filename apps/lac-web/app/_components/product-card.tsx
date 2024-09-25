"use client";

import useGtmUser from "@/_hooks/gtm/use-gtm-user.hook";
import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import usePathnameHistoryState from "@/_hooks/misc/use-pathname-history-state.hook";
import usePriceCheck from "@/_hooks/product/use-price-check.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { getGTMItemListPage, getGTMPageType } from "@/_lib/gtm-utils";
import type { GetPricesResult, Product } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { sendGTMEvent } from "@next/third-parties/google";
import {
  ProductCardActions,
  ProductCardContent,
  ProductCardDetails,
  ProductCardDiscount,
  ProductCardHero,
  ProductCardImage,
  ProductCardPrice,
  ProductCard as ProductCardRoot,
  ProductCardVariantSelector,
} from "@repo/web-ui/components/product-card";
import { useRouter } from "next/navigation";
import { useState, type ComponentProps } from "react";
import AddToShoppingListDialog from "./add-to-shopping-list-dialog";
import SaleBadges from "./sale-badges";

type ProductProps = {
  readonly orientation?: ComponentProps<typeof ProductCardRoot>["orientation"];
  readonly product: Product;
  readonly token?: string;
  readonly stretchWidth?: boolean;
  /**
   * This data should be fetched in a parent component using the `useSuspensePriceCheck`
   * query. The `ProductCard` component itself will fetch the price of any of the other
   * variants when selected.
   */
  readonly firstVariantPrice: GetPricesResult["productPrices"][number];
  readonly favoriteData?: {
    productId: number;
    isFavorite: boolean;
    favoriteListIds: string[];
  }[];
};

const ProductCard = ({
  orientation = "vertical",
  product,
  token,
  stretchWidth = false,
  firstVariantPrice,
  favoriteData = [],
}: ProductProps) => {
  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const router = useRouter();

  const checkLoginQuery = useSuspenseCheckLogin(token);
  const isLoggedInUser = checkLoginQuery.data?.status_code === "OK";

  const defaultVariant = product.variants[0];
  const selectedVariant = product.variants.find(
    (variant) => variant.id === selectedId,
  );
  const priceCheckQuery = usePriceCheck(
    token,
    selectedVariant
      ? [
          {
            productId: Number(selectedVariant.id),
            qty: 1,
          },
        ]
      : defaultVariant
        ? [
            {
              productId: Number(defaultVariant.id),
              qty: 1,
            },
          ]
        : [],
    {
      initialData:
        // Give the price of the 1st variant as the initial data of the query when
        // - There is not variant selected
        // - The selected variant is the default(1st) variant
        !selectedId || !defaultVariant || defaultVariant?.id === selectedId
          ? { error: null, productPrices: [firstVariantPrice] }
          : undefined,
    },
  );

  // Get Product Details
  let href = "";
  let image = "";
  if (
    (product.variants.length === 1 ||
      (product.variants.length > 1 && !selectedVariant)) &&
    defaultVariant
  ) {
    href = `/product/${defaultVariant.id}/${defaultVariant.slug}`;
    image = defaultVariant.image;
  } else if (selectedVariant) {
    href = `/product/${selectedVariant.id}/${selectedVariant.slug}`;
    image = selectedVariant.image;
  }

  // Get Variant Data
  let id = "";
  let sku = "";
  let uom = "";
  let onSale = false;
  let isNewItem = false;
  if (selectedVariant) {
    id = selectedVariant.id;
    sku = selectedVariant.sku;
    uom = selectedVariant.uom;
    onSale = selectedVariant.onSale ?? false;
    isNewItem = selectedVariant.isNewItem ?? false;
  } else if (defaultVariant) {
    id = defaultVariant.id;
    sku = defaultVariant.sku;
    uom = defaultVariant.uom;
    onSale = defaultVariant.onSale ?? false;
    isNewItem = defaultVariant.isNewItem ?? false;
  }

  const selectedFavoriteData = favoriteData.find(
    (item) => item.productId.toString() === id,
  );

  // Get Product Title
  let title = "";
  if (product.variants.length === 1 && defaultVariant) {
    title = defaultVariant.title;
  }
  if (product.variants.length > 1) {
    if (selectedVariant) {
      title = selectedVariant.title;
    } else {
      title = product.groupName;
    }
  }

  const priceData = priceCheckQuery.data?.productPrices[0];

  const listPrice = priceData?.listPrice ?? 0;
  const currentPrice = priceData?.uomPrice ?? priceData?.price ?? 0;
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

  const productId = useAddToCartDialog((state) => state.productId);

  const addToCart = () => {
    setProductId(parseInt(id));
    setOpen("verification");
  };

  const pathnameHistory = usePathnameHistoryState(
    (state) => state.pathnameHistory,
  );

  const gtmItemUserQuery = useGtmUser();
  const gtmUser = gtmItemUserQuery.data;

  const productTitleOrImageOnClick = () => {
    const gtmItemInfo = product.gtmProduct?.find(
      (item) => Number(item?.productid) === productId,
    );

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

  const onSelectVariantChange = (id: string) => {
    setSelectedId(id);
    const gtmItemInfo = product.gtmProduct?.find(
      (item) => item?.productid === id,
    );
    if (gtmItemInfo && gtmUser) {
      sendGTMEvent({
        event: "view_item_variant",
        viewItemVariantData: {
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
              item_category3: gtmItemInfo?.item_category_path[3] ?? "",
            },
          ],
          page_type: getGTMPageType(
            pathnameHistory[pathnameHistory.length - 1] ?? "",
          ),
        },
        data: {
          userid: gtmUser?.userid,
          account_type: gtmUser?.account_type,
          account_industry: gtmUser?.account_industry,
          account_sales_category: gtmUser?.account_sales_category,
        },
      });
    }
  };

  return (
    <>
      <ProductCardRoot
        orientation={orientation}
        className={cn(
          "shrink-0 snap-start",
          orientation === "horizontal" ? "w-full" : "min-h-[25.75rem]",
          stretchWidth && "md:w-full",
        )}
      >
        <ProductCardHero>
          <div className="flex flex-row justify-between gap-2 @container/labels">
            {!isLaminateItem && discountPercent > 0 && !isLoggedInUser ? (
              <ProductCardDiscount>{discountPercent}</ProductCardDiscount>
            ) : (
              <div className="invisible md:text-lg">0</div>
            )}

            {orientation === "vertical" && (
              <SaleBadges
                onSale={onSale}
                isNewItem={isNewItem}
                showFlashDealText={
                  !(discountPercent > 0 && onSale && isNewItem)
                }
              />
            )}
          </div>
          <ProductCardImage
            src={image}
            alt={title}
            href={href}
            title={title}
            productTitleOrImageOnClick={productTitleOrImageOnClick}
          />
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

          <ProductCardDetails
            title={title}
            sku={sku}
            href={href}
            productTitleOrImageOnClick={productTitleOrImageOnClick}
          />

          <div className="flex flex-col gap-2">
            <ProductCardPrice
              price={currentPrice}
              uom={uom}
              actualPrice={listPrice}
              isLaminateItem={isLaminateItem}
              showDiscount={!isLoggedInUser}
            />

            {product.variants.length > 1 ? (
              <ProductCardVariantSelector
                href={href}
                value={selectedId}
                onValueChange={onSelectVariantChange}
                variants={product.variants.map((variant) => ({
                  value: variant.id,
                  title: variant.title,
                }))}
                addToCart={addToCart}
                isFavorite={selectedFavoriteData?.isFavorite}
                onClickShoppingList={() => {
                  if (isLoggedInUser) {
                    setShowShoppingListsDialog(true);
                  } else {
                    router.push("/sign-in");
                  }
                }}
              />
            ) : (
              <ProductCardActions
                addToCart={addToCart}
                isFavorite={selectedFavoriteData?.isFavorite}
                onClickShoppingList={() => {
                  if (isLoggedInUser) {
                    setShowShoppingListsDialog(true);
                  } else {
                    router.push("/sign-in");
                  }
                }}
              />
            )}
          </div>
        </ProductCardContent>
      </ProductCardRoot>

      <AddToShoppingListDialog
        open={showShoppingListsDialog}
        setOpenAddToShoppingListDialog={setShowShoppingListsDialog}
        productId={parseInt(id)}
        favoriteListIds={selectedFavoriteData?.favoriteListIds}
        token={token}
      />
    </>
  );
};

export default ProductCard;
