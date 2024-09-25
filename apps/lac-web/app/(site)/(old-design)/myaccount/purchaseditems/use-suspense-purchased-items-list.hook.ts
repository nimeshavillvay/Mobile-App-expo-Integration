import { api } from "@/_lib/api";
import type {
  Filters,
  OldPurchasedItems,
  Pagination,
  PurchasedItems,
  PurchasedProduct,
} from "@/_lib/types";
import useFilterParams from "@/old/myaccount/_side-menu/use-filter-params.hook";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspensePurchasedItemsList = (
  token: string,
  fromDate: string,
  toDate: string,
  page: number,
  size: number,
  orderBy: string,
  orderType: string,
  filters: Filters[],
) => {
  const { selectedValues } = useFilterParams(filters);

  const selectedFilters: {
    [attributeId: string]: string[];
  } = {};

  for (const [key, value] of Object.entries(selectedValues)) {
    selectedFilters[key] = value.values.map((v) => v.id);
  }

  const body: {
    [attributeId: string]: {
      [valueId: string]: "Y";
    };
  } = {};

  if (selectedFilters) {
    for (const [key, values] of Object.entries(selectedFilters)) {
      values.forEach((value) => {
        body[key] = {
          ...body[key],
          [value]: "Y",
        };
      });
    }
  }

  return useSuspenseQuery({
    queryKey: [
      "user",
      "order-history",
      token,
      fromDate,
      toDate,
      page,
      size,
      orderBy,
      orderType,
      body,
    ],
    queryFn: () =>
      api
        .post("rest/order-history/purchase", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          searchParams: {
            from: fromDate,
            to: toDate,
            page: page,
            perpage: size,
            sort: orderBy,
            sort_direction: orderType,
          },
          json: {
            rf_data: body,
          },
        })
        .json<OldPurchasedItems>(),
    select: (data): PurchasedItems => {
      const { products, pagination } = data;

      const mappedProducts = products.map(
        ({
          product,
          sku,
          id,
          totalItem,
          orderDate,
          isDiscontinued,
          isFavorite,
        }): PurchasedProduct => ({
          productTitle: product,
          productSku: sku,
          productId: Number(id),
          totalItem: Number(totalItem),
          purchaseOrderDate: orderDate,
          isDiscontinued,
          isFavorite,
        }),
      );

      const firstPagination = pagination[0] || {
        db_count: "0",
        offset: 0,
        perPage: 0,
      };

      const mappedPagination: Pagination = {
        totalCount: Number(firstPagination.db_count),
        offset: firstPagination.offset,
        perPage: firstPagination.perPage,
      };

      return { products: mappedProducts, pagination: mappedPagination };
    },
  });
};

export default useSuspensePurchasedItemsList;
