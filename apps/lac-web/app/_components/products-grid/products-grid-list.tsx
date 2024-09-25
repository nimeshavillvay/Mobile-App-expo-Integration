"use client";

import ProductCard from "@/_components/product-card";
import ProductCardSkeleton from "@/_components/product-card-skeleton";
import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import useSuspenseFavoriteSKUs from "@/_hooks/shopping-list/use-suspense-favorite-skus.hook";
import { cn } from "@/_lib/utils";
import { type ComponentProps, type ReactNode } from "react";

const ProductsGridListContainer = ({
  type,
  children,
  className,
}: {
  readonly type: "mobile" | "desktop";
  readonly children: ReactNode;
  readonly className?: ComponentProps<"div">["className"];
}) => {
  return (
    <div
      className={cn(
        type === "mobile"
          ? "flex flex-col gap-3 md:hidden"
          : "grid flex-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ProductsGridList = ({
  type,
  className,
  products,
  token,
}: {
  readonly type: ComponentProps<typeof ProductsGridListContainer>["type"];
  readonly className?: ComponentProps<
    typeof ProductsGridListContainer
  >["className"];
  readonly products: {
    prop: ComponentProps<typeof ProductCard>["product"];
    info: { groupId: string };
  }[];
  readonly token?: string;
}) => {
  const orientation = type === "mobile" ? "horizontal" : "vertical";

  const firstVariants = products
    .map((product) => product.prop.variants[0])
    .filter(Boolean);

  const priceCheckQuery = useSuspensePriceCheck(
    token,
    firstVariants.map((product) => ({
      productId: Number(product.id),
      qty: 1,
    })),
  );
  const favoriteSkusQuery = useSuspenseFavoriteSKUs(
    token,
    firstVariants.map((product) => product.id),
  );

  const gtmProducts = products
    .flatMap((product) => product.prop.variants)
    .map((product) => {
      return {
        productid: Number(product.id),
        cartid: 0,
        quantity: 1,
      };
    });
  const gtmItemInfoQuery = useGtmProducts(gtmProducts);
  const gtmItemInfo = gtmItemInfoQuery.data;

  return (
    <ProductsGridListContainer type={type} className={className}>
      {products.map(({ prop, info }) => {
        const productIds = prop.variants.map((variant) => variant.id);
        const firstVariantProductId = productIds[0];

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

        const productProps = {
          ...prop,
          gtmItemInfo,
        };

        const favoriteData = favoriteSkusQuery.data.filter((item) =>
          productIds.includes(item.productId.toString()),
        );

        return (
          <ProductCard
            key={info.groupId}
            orientation={orientation}
            product={productProps}
            token={token}
            stretchWidth={orientation === "vertical"}
            firstVariantPrice={price}
            favoriteData={favoriteData}
          />
        );
      })}
    </ProductsGridListContainer>
  );
};

export const ProductsGridListSkeleton = ({
  type,
  numberOfCards = 20,
}: {
  readonly type: ComponentProps<typeof ProductsGridListContainer>["type"];
  readonly numberOfCards?: number;
}) => {
  return (
    <ProductsGridListContainer type={type}>
      {Array.from({ length: numberOfCards }).map((_, index) => (
        <ProductCardSkeleton
          key={index}
          orientation={type === "mobile" ? "horizontal" : "vertical"}
          stretchWidth={type === "desktop"}
        />
      ))}
    </ProductsGridListContainer>
  );
};
