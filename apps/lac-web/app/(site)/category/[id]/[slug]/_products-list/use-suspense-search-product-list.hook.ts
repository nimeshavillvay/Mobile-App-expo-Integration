import { useFilterParams } from "@/_components/products-grid";
import useSuspenseSearch from "@/_hooks/search/use-suspense-search.hook";
import type { Filters } from "@/_lib/types";

const useSuspenseSearchProductList = (
  token: string | undefined,
  categoryId: string,
  filters: Filters[],
) => {
  const { pageNo, selectedValues } = useFilterParams(filters);

  const selectedFilters: {
    [attributeId: string]: string[];
  } = {};

  for (const [key, value] of Object.entries(selectedValues)) {
    selectedFilters[key] = value.values.map((v) => v.id);
  }

  return useSuspenseSearch(
    token,
    {
      categoryId,
      groupResults: true,
      page: pageNo,
    },
    selectedFilters,
  );
};

export default useSuspenseSearchProductList;
