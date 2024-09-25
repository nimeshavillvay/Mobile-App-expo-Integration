import type { QUERY_KEYS } from "@/_lib/constants";
import { updateSearchParams } from "@/old/_utils/client-helpers";
import "client-only";

export const changeSearchParams = (
  searchParams: URLSearchParams,
  params: {
    key: (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
    value: string;
  }[],
) => {
  const newSearchParams = new URLSearchParams(searchParams);

  params.forEach((param) => {
    newSearchParams.set(param.key, param.value);
  });

  updateSearchParams(newSearchParams);
};
