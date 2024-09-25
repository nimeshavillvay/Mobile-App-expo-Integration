import { searchApi } from "@/_lib/api";
import { useQuery } from "@tanstack/react-query";

export type SearchData = {
  summary: {
    total: number;
    page_size: number;
    page_no: number;
    plp: boolean;
  };
  results: {
    id: string;
    categoryName?: string;
    categoryPath?: string;
    parentCategoryList?: string;
    subCategoryList?: string;
    slug: string;
    brandName?: string;
    brandImage?: string;
    lastUpadtedDate?: string | null;
    MFRPartNo?: string;
    sellingBookSequenceNo?: string;
    UPCCode?: string;
    alias?: string;
    materialNumber?: string;
    productTitle?: string;
    Status?: string;
    productStatus?: string;
    createDate?: string;
    keywords?: string;
    minimumOrderQuantity?: string;
    orderQuantitybyIncrements?: string;
    attributes?: [];
    itemImages?: string;
    uom?: string;
  }[];
};
type Results = {
  products: SearchData;
  categories: SearchData;
  brands: SearchData;
};

/**
 * This is to pass to the `SearchBoxInput` component to avoid the `undefined` state
 */
export const placeholderData: Results = {
  products: {
    summary: {
      total: 0,
      page_size: 0,
      page_no: 0,
      plp: false,
    },
    results: [],
  },
  brands: {
    summary: {
      total: 0,
      page_size: 0,
      page_no: 0,
      plp: false,
    },
    results: [],
  },
  categories: {
    summary: {
      total: 0,
      page_size: 0,
      page_no: 0,
      plp: false,
    },
    results: [],
  },
};

const useMultiSearch = (query: string) => {
  return useQuery({
    queryKey: ["multi-search", query],
    queryFn: () =>
      searchApi
        .get("multisearch", {
          searchParams: new URLSearchParams({
            query,
          }),
        })
        .json<Results>(),
    placeholderData: (previousData) => {
      return previousData ?? placeholderData;
    },
    enabled: !!query,
  });
};

export default useMultiSearch;
