import { api } from "@/_lib/api";
import type { Filters } from "@/_lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { MyOrders } from "./types";
import { useFilterParams } from "./use-filter-params.hook";

const useSuspenseOrderHistorySearch = (
  token: string,
  fromDate: string,
  toDate: string,
  currentPage: number,
  pageSize: number,
  sortBy: string,
  sortDirection: string,
  filters: Filters[],
  searchText: string,
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
      "my-orders",
      token,
      fromDate,
      toDate,
      currentPage,
      pageSize,
      sortBy,
      sortDirection,
      body,
      searchText,
    ],
    queryFn: () =>
      api
        .post("rest/order-history/search", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          searchParams: {
            from: fromDate,
            to: toDate,
            page: currentPage,
            perpage: pageSize,
            sort: sortBy,
            sort_direction: sortDirection,
            orderNo: searchText,
          },
          json: {
            rf_data: body,
          },
        })
        .json<MyOrders>(),
  });
};

export default useSuspenseOrderHistorySearch;
