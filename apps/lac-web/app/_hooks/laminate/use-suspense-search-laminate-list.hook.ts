import { useFilterParams } from "@/_components/products-grid";
import useSuspenseLaminateSearch from "@/_hooks/laminate/use-suspense-laminate-search.hook";
import { INIT_PER_PAGE, QUERY_KEYS } from "@/_lib/constants";
import type { Filters } from "@/_lib/types";

const useSuspenseSearchLaminateList = (token: string, filters: Filters[]) => {
  const { pageNo, selectedValues, searchParams } = useFilterParams(filters);

  const selectedFilters: {
    [attributeId: string]: string[];
  } = {};

  for (const [key, value] of Object.entries(selectedValues)) {
    selectedFilters[key] = value.values.map((v) => v.id);
  }

  return useSuspenseLaminateSearch(
    token,
    {
      groupResults: true,
      page: pageNo,
      searchText: searchParams.get(QUERY_KEYS.SEARCH_TEXT) ?? "",
      perPage: Number(searchParams.get(QUERY_KEYS.PER_PAGE) ?? INIT_PER_PAGE),
    },
    selectedFilters,
  );
};

export default useSuspenseSearchLaminateList;
