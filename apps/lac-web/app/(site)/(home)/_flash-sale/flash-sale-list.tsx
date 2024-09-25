"use client";

import ProductCard from "@/_components/product-card";
import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import useSuspenseFavoriteSKUs from "@/_hooks/shopping-list/use-suspense-favorite-skus.hook";
import type { MappedFeaturedProduct } from "./type";

type FlashSaleListProps = {
  readonly token?: string;
  readonly products: MappedFeaturedProduct[];
};

const FlashSaleList = ({ token, products }: FlashSaleListProps) => {
  const priceCheckQuery = useSuspensePriceCheck(
    token,
    products.map((product) => ({
      productId: Number(product.productId),
      qty: 1,
    })),
  );
  const favoriteSkusQuery = useSuspenseFavoriteSKUs(
    token,
    products.map((product) => product.productId),
  );

  const gtmProducts = products.map((product) => {
    return {
      productid: Number(product.productId),
      cartid: 0,
      quantity: 1,
    };
  });
  const gtmItemInfoQuery = useGtmProducts(gtmProducts);
  const gtmItemInfo = gtmItemInfoQuery.data;

  return products.map((product) => {
    const priceData = priceCheckQuery.data.productPrices.find(
      (price) => price.productId.toString() === product.productId,
    );
    const favoriteData = favoriteSkusQuery.data.filter(
      (favorite) => Number(favorite.productId) === Number(product.productId),
    );

    if (!priceData) {
      return null;
    }

    return (
      <ProductCard
        key={product.productId}
        orientation="vertical"
        token={token}
        product={{
          groupName: product.productTitle,
          groupImage: product.groupImage,
          variants: [
            {
              id: product.productId,
              slug: product.slug,
              sku: product.productSku,
              title: product.productTitle,
              image: product.productImage,
              uom: product.unitOfMeasure,
              isNewItem: product.isNewItem,
            },
          ],
          gtmProduct: gtmItemInfo ?? [],
        }}
        firstVariantPrice={priceData}
        favoriteData={favoriteData}
      />
    );
  });
};

export default FlashSaleList;
