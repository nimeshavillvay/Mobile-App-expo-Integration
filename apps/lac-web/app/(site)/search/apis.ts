import { searchApi } from "@/_lib/api";
import { cookies } from "next/headers";
import "server-only";
import { SEARCH_PARAMS_COOKIE } from "./constants";
import type { SearchData } from "./types";

export const getSearchResults = async ({
  query,
  pageNo = "1",
}: {
  pageNo?: string;
  query: string;
}) => {
  const cookiesStore = cookies();
  const searchParamsCookie = cookiesStore.get(SEARCH_PARAMS_COOKIE);

  return await searchApi
    .get("search", {
      searchParams: new URLSearchParams({
        pageNo,
        query,
        isFilterByBrand: "false",
        pageSize: "24",
      }),
      headers: {
        searchParams: searchParamsCookie?.value,
      },
      cache: "no-store",
    })
    .json<SearchData>();
};
