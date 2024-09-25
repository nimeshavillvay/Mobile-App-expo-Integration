"use client";

import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useItemInfo from "@/_hooks/product/use-item-info.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import useSuspenseFavoriteSKUs from "@/_hooks/shopping-list/use-suspense-favorite-skus.hook";
import { INIT_PAGE_NUMBER } from "@/_lib/constants";
import type { ItemInfo } from "@/_lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { Suspense, useDeferredValue, type ComponentProps } from "react";
import { changeSearchParams } from "./client-helpers";
import {
  DEFAULT_SORT,
  INIT_FROM_DATE,
  INIT_PER_PAGE,
  INIT_SORTING_FIELD,
  INIT_SORTING_TYPE,
  INIT_TO_DATE,
  QUERY_KEYS,
  SORTING_BY_FIELDS,
  SORTING_TYPES,
} from "./constants";
import PurchasedItemRow from "./purchased-item-row";
import PurchasedItemsListForMobile from "./purchased-items-list-for-mobile";
import PurchasedItemsSelectors from "./purchased-items-selectors";
import TotalCountAndPagination from "./total-count-and-pagination";
import type { DetailedPurchasedItem } from "./types";
import useSuspensePurchasedItemsList from "./use-suspense-purchased-items-list.hook";

const PurchasedItemsList = ({ token }: { readonly token: string }) => {
  const searchParams = useSearchParams();
  const deferredSearchParams = useDeferredValue(searchParams);
  const fromDate = deferredSearchParams.get("from") ?? INIT_FROM_DATE;
  const toDate = deferredSearchParams.get("to") ?? INIT_TO_DATE;
  const orderBy = searchParams.get(QUERY_KEYS.ORDER_BY) ?? INIT_SORTING_FIELD;
  const orderType =
    searchParams.get(QUERY_KEYS.ORDER_TYPE) ?? INIT_SORTING_TYPE;
  const page = Number(searchParams.get(QUERY_KEYS.PAGE) ?? INIT_PAGE_NUMBER);
  const perPage = Number(
    searchParams.get(QUERY_KEYS.PER_PAGE) ?? INIT_PER_PAGE,
  );

  const deferredPerPage = useDeferredValue(perPage);

  let isLoading = true;
  let totalItems = 0;

  const selectedSorting = SORTING_TYPES.find(
    (sortingType) => sortingType.value === orderType,
  );

  const values: { [key: string]: string[] } = {};

  for (const key of deferredSearchParams.keys()) {
    if (key !== "page" && key !== "from" && key !== "to") {
      values[key] = deferredSearchParams.getAll(key);
    }
  }
  const filtersQuery = useSuspenseFilters(token, {
    type: "Purchases",
    from: fromDate,
    to: toDate,
    values,
  });

  const purchasedItemsList = useSuspensePurchasedItemsList(
    token,
    fromDate,
    toDate,
    page,
    deferredPerPage,
    orderBy,
    orderType,
    filtersQuery.data,
  );

  const productIds: number[] = [];
  if (purchasedItemsList.data) {
    totalItems = purchasedItemsList.data.pagination.totalCount;

    purchasedItemsList.data.products.forEach((product) => {
      const isExist = productIds.find((id) => id === product.productId);
      if (!isExist && !!product.productId) {
        productIds.push(product.productId);
      }
    });
  }

  const getItemInfo = useItemInfo(productIds);
  if (purchasedItemsList && getItemInfo) {
    isLoading = false;
  }

  const onChangeSortingParams = (orderBy: string, orderType: string) => {
    changeSearchParams(searchParams, [
      {
        key: QUERY_KEYS.ORDER_BY,
        value: orderBy,
      },
      {
        key: QUERY_KEYS.ORDER_TYPE,
        value: orderType,
      },
    ]);
  };

  const detailedPurchasedItems: DetailedPurchasedItem[] = [];

  if (purchasedItemsList.data.pagination.totalCount > 0) {
    purchasedItemsList.data.products.forEach((item) => {
      const itemInfo = getItemInfo?.data?.find(
        (info) => info.productSku === item.productSku,
      );

      if (!!item.productId && !!item.productSku) {
        const initialDetails: ItemInfo = {
          productId: item.productId,
          slug: "",
          isExcludedProduct: false,
          productSku: item.productSku,
          productName: "",
          image: "",
          isComparison: false,
          isHazardous: false,
          specialShipping: false,
          productIdOnSap: "",
          mfrPartNo: "",
          productDescription: "",
          productTitle: item.productTitle,
          brandCode: 0,
          unitOfMeasure: "",
          boxQuantity: 0,
          minimumOrderQuantity: 0,
          quantityByIncrements: 0,
          weight: 0,
          prop65MessageOne: "",
          prop65MessageTwo: "",
          prop65MessageThree: "",
          listPrice: 0,
          isSaleItem: false,
          isNewItem: false,
          fClassId: 0,
          class: "",
          attributes: [],
          productStatus: "",
          isDirectlyShippedFromVendor: false,
          productSummary: "",
          brand: "",
          productCategory: "",
        };

        detailedPurchasedItems.push({
          ...item,
          ...(itemInfo ?? initialDetails),
        });
      }
    });
  }

  return (
    <>
      {!isLoading && (
        <PurchasedItemsSelectors
          isLoading={isLoading}
          totalItems={totalItems}
        />
      )}

      <TotalCountAndPagination
        isLoading={isLoading}
        totalItems={totalItems}
        itemCountOnly
      />

      {/* Mobile View for Items List */}
      {detailedPurchasedItems.length > 0 && (
        <Suspense
          fallback={<Skeleton className="h-[100rem] w-full py-4 md:hidden" />}
        >
          <PurchasedItemsListForMobile
            items={detailedPurchasedItems}
            token={token}
          />
        </Suspense>
      )}

      {/* Desktop View for Items List */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2} className="space-y-2 py-3">
                <div>Item # / MFR Part #</div>
                <Select
                  value={SORTING_BY_FIELDS.SKU}
                  onValueChange={(value) => {
                    onChangeSortingParams(SORTING_BY_FIELDS.SKU, value);
                  }}
                >
                  <SelectTrigger className="h-8 w-[120px] py-0">
                    <SelectValue>
                      {orderBy === SORTING_BY_FIELDS.SKU
                        ? selectedSorting?.label
                        : DEFAULT_SORT}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {SORTING_TYPES.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="pl-2"
                      >
                        <div>{type.label}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableHead>
              <TableHead className="space-y-2 py-3">
                <div>Order Date</div>
                <Select
                  value={SORTING_BY_FIELDS.ORDER_DATE}
                  onValueChange={(value) => {
                    onChangeSortingParams(SORTING_BY_FIELDS.ORDER_DATE, value);
                  }}
                >
                  <SelectTrigger className="h-8 w-[120px] py-0">
                    <SelectValue>
                      {orderBy === SORTING_BY_FIELDS.ORDER_DATE
                        ? selectedSorting?.label
                        : DEFAULT_SORT}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {SORTING_TYPES.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="pl-2"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableHead>

              <TableHead className="space-y-2 py-3">
                <div>Order Count</div>
                <Select
                  value={SORTING_BY_FIELDS.TOTAL_ITEMS}
                  onValueChange={(value) => {
                    onChangeSortingParams(SORTING_BY_FIELDS.TOTAL_ITEMS, value);
                  }}
                >
                  <SelectTrigger className="h-8 w-[120px] py-0">
                    <SelectValue>
                      {orderBy === SORTING_BY_FIELDS.TOTAL_ITEMS
                        ? selectedSorting?.label
                        : DEFAULT_SORT}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {SORTING_TYPES.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="pl-2"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableHead>

              <TableHead colSpan={2} className="space-y-2 py-3 text-center">
                Price
              </TableHead>
              <TableHead className="space-y-2 py-3">UOM</TableHead>
              <TableHead className="space-y-2 py-3 text-center">
                Quantity
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {detailedPurchasedItems.length > 0 && (
              <PurchasedItemRows
                detailedPurchasedItems={detailedPurchasedItems}
                token={token}
              />
            )}
          </TableBody>
        </Table>
      </div>

      {detailedPurchasedItems.length > 0 && totalItems >= perPage && (
        <TotalCountAndPagination
          isLoading={isLoading}
          totalItems={totalItems}
        />
      )}
    </>
  );
};

export default PurchasedItemsList;

const PurchasedItemRows = ({
  detailedPurchasedItems,
  token,
}: {
  detailedPurchasedItems: DetailedPurchasedItem[];
  token: string;
}) => {
  const products = detailedPurchasedItems.map((item) => ({
    productId: item.productId,
    qty: item.minimumOrderQuantity,
  }));

  detailedPurchasedItems.forEach((item) => {
    if (item.minimumOrderQuantity !== 1) {
      products.push({
        productId: item.productId,
        qty: 1,
      });
    }
  });

  const gtmProducts = products.map((product) => {
    return {
      productid: product.productId,
      cartid: 0,
      quantity: 1,
    };
  });

  const gtmItemInfoQuery = useGtmProducts(gtmProducts);
  const gtmItemInfo = gtmItemInfoQuery.data;

  const initialPriceCheckQuery = useSuspensePriceCheck(
    token,
    detailedPurchasedItems.map((item) => ({
      productId: item.productId,
      qty: 1,
    })),
  );
  const priceCheckQuery = useSuspensePriceCheck(
    token,
    detailedPurchasedItems.map((item) => ({
      productId: item.productId,
      qty: item.minimumOrderQuantity,
    })),
  );

  const favoriteSkusQuery = useSuspenseFavoriteSKUs(
    token,
    detailedPurchasedItems.map((item) => item.productId.toString()),
  );

  return detailedPurchasedItems.map((item, index) => {
    const prices: ComponentProps<typeof PurchasedItemRow>["prices"] = [];

    const initialPriceCheck = initialPriceCheckQuery.data.productPrices.find(
      (price) => Number(price.productId) === item.productId,
    );
    if (initialPriceCheck) {
      prices.push({
        price: initialPriceCheck.price,
        priceBreakDowns: initialPriceCheck.priceBreakDowns,
        priceUnit: initialPriceCheck.priceUnit,
        quantity: 1,
        uomPrice: initialPriceCheck.uomPrice,
        uomPriceUnit: initialPriceCheck.uomPriceUnit,
      });
    }

    const priceCheck = priceCheckQuery.data.productPrices.find(
      (price) => Number(price.productId) === item.productId,
    );
    if (priceCheck) {
      prices.push({
        price: priceCheck.price,
        priceBreakDowns: priceCheck.priceBreakDowns,
        priceUnit: priceCheck.priceUnit,
        quantity: item.minimumOrderQuantity,
        uomPrice: priceCheck.uomPrice,
        uomPriceUnit: priceCheck.uomPriceUnit,
      });
    }

    const favoriteData = favoriteSkusQuery.data.find(
      (favoriteSku) => favoriteSku.productId === item.productId,
    );

    return (
      <PurchasedItemRow
        key={`${item.productId}_${index}`}
        token={token}
        index={index}
        item={item}
        prices={prices}
        gtmItemInfo={gtmItemInfo?.find(
          (product) => Number(product.productid) === item.productId,
        )}
        isFavorite={favoriteData?.isFavorite}
        favoriteListIds={favoriteData?.favoriteListIds}
      />
    );
  });
};
