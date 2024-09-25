"use client";

import ProductCard from "@/_components/product-card";
import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import useSuspenseFavoriteSKUs from "@/_hooks/shopping-list/use-suspense-favorite-skus.hook";
import type { FeaturedBrandGroup } from "./types";

type FeaturedBrandListProps = {
  token?: string;
  groups: FeaturedBrandGroup[];
};

const FeaturedBrandList = ({ token, groups }: FeaturedBrandListProps) => {
  const firstVariants = groups
    .map((group) => group.itemSkuList[0])
    .filter(Boolean);

  const priceCheckQuery = useSuspensePriceCheck(
    token,
    firstVariants.map((product) => ({
      productId: Number(product.productId),
      qty: 1,
    })),
  );
  const favoriteSkusQuery = useSuspenseFavoriteSKUs(
    token,
    groups.flatMap((group) => group.itemSkuList).map((item) => item.productId),
  );

  const gtmProducts = groups
    .flatMap((group) => group.itemSkuList)
    .map((product) => {
      return {
        productid: Number(product.productId),
        cartid: 0,
        quantity: 1,
      };
    });
  const gtmItemInfoQuery = useGtmProducts(gtmProducts);
  const gtmItemInfo = gtmItemInfoQuery.data;

  return groups.map((group) => {
    const productIds = group.itemSkuList.map((item) => item.productId);
    const firstVariantProductId = productIds[0];

    const favoriteData = favoriteSkusQuery.data.filter((item) =>
      productIds.includes(item.productId.toString()),
    );

    if (!firstVariantProductId) {
      // This is to stop TypeScript from complaining about
      // firstVariantProductId being undefined
      return null;
    }

    const price = priceCheckQuery.data.productPrices.find(
      (price) => price.productId === firstVariantProductId,
    );

    if (!price) {
      // This is to stop TypeScript from complaining about
      // price being undefined
      return null;
    }

    return (
      <ProductCard
        key={group.groupId}
        product={{
          groupName: group.groupName,
          groupImage: group.groupImage,
          variants: group.itemSkuList.map((item) => ({
            id: item.productId,
            slug: item.slug,
            sku: item.productSku,
            title: item.productName,
            image: item.image,
            uom: item.unitOfMeasure,
            onSale: item.isSaleItem,
            isNewItem: item.isNewItem,
          })),
          gtmProduct: gtmItemInfo ?? [],
        }}
        token={token}
        firstVariantPrice={price}
        favoriteData={favoriteData}
      />
    );
  });
};

export default FeaturedBrandList;
