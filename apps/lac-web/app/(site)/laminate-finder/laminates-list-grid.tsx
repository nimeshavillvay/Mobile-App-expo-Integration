"use client";

import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useSuspenseLaminateFilters from "@/_hooks/laminate/use-suspense-laminate-filters.hook";
import useSuspenseSearchLaminateList from "@/_hooks/laminate/use-suspense-search-laminate-list.hook";
import { Suspense, type ComponentProps } from "react";
import {
  LaminatesGridList,
  LaminatesGridListSkeleton,
} from "./laminates-grid-list";

type LaminateListGridProps = {
  readonly token: string;
};

const LaminateListGrid = ({ token }: LaminateListGridProps) => {
  const categoryFiltersQuery = useSuspenseLaminateFilters({
    token,
  });
  const { data } = useSuspenseSearchLaminateList(
    token,
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

  const products: ComponentProps<typeof LaminatesGridList>["products"] =
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
          isExcludedProduct: variant.isExcludedProduct,
        })),
        gtmProduct: gtmItemInfo ?? [],
      },
      info: {
        groupId: product.groupId,
      },
    }));

  return data.pagination.totalCount > 0 ? (
    <Suspense fallback={<LaminatesGridListSkeleton />}>
      <LaminatesGridList products={products} token={token} />
    </Suspense>
  ) : (
    "No results found"
  );
};

export default LaminateListGrid;
