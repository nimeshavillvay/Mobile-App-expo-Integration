"use client";

import { ProductsGridList } from "@/_components/products-grid";
import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import { type ComponentProps } from "react";
import useSuspenseCategoryFilters from "./use-suspense-category-filters.hook";
import useSuspenseSearchProductList from "./use-suspense-search-product-list.hook";

type ProductListGridProps = {
  readonly token?: string;
  readonly categoryId: string;
  readonly type: ComponentProps<typeof ProductsGridList>["type"];
};

const ProductListGrid = ({ token, categoryId, type }: ProductListGridProps) => {
  const categoryFiltersQuery = useSuspenseCategoryFilters({
    token,
    categoryId,
  });
  const { data } = useSuspenseSearchProductList(
    token,
    categoryId,
    categoryFiltersQuery.data,
  );

  const productIds = data.groupList.flatMap((group) =>
    group.productSkuList.map((variant) => Number(variant.productId)),
  );

  const gtmProducts = productIds.map((productId) => {
    return {
      productid: productId,
      cartid: 0,
      quantity: 1,
    };
  });
  const gtmItemInfoQuery = useGtmProducts(gtmProducts);
  const gtmItemInfo = gtmItemInfoQuery.data;

  const products: ComponentProps<typeof ProductsGridList>["products"] =
    data.groupList.map((product) => ({
      prop: {
        groupName: product.productGroupName,
        groupImage: product.groupImage,
        variants: product.productSkuList.map((variant) => ({
          id: variant.productId,
          slug: variant.slug,
          sku: variant.productSku,
          title: variant.productName,
          image: variant.image,
          uom: variant.unitOfMeasure,
          onSale: variant.isSaleItem,
          isNewItem: variant.isNewItem,
        })),
        gtmProduct: gtmItemInfo ?? [],
      },
      info: {
        groupId: product.groupId,
      },
    }));

  if (!products.length) {
    return null;
  }

  return <ProductsGridList products={products} type={type} token={token} />;
};

export default ProductListGrid;
