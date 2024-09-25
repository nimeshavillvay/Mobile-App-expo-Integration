import type { SearchData, SearchResult } from "@/(site)/search/types";
import { searchApi } from "@/_lib/api";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "./types";

const useSearch = (searchText: string) => {
  return useQuery({
    queryKey: ["search", searchText],
    queryFn: () =>
      searchApi
        .get("search", {
          searchParams: {
            query: searchText,
            "quick-order": true,
          },
        })
        .json<SearchData>(),
    enabled: !!searchText,
    select: (data) => {
      const { results } = data;

      if (Array.isArray(results)) {
        return results.map((result) => {
          return mapSearchResults(result);
        });
      }

      return [mapSearchResults(results)];
    },
  });
};

export default useSearch;

const mapSearchResults = (result: SearchResult): Product => {
  return {
    sku: result.materialNumber,
    title: result.productTitle,
    image: result.itemImage,
    minimumOrderQuantity: parseInt(result.minimumOrderQuantity),
    orderQuantityByIncrements: parseInt(result.orderQuantityByIncrements),
  };
};
