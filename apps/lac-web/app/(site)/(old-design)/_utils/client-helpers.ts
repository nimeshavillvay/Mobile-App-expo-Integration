import { FILTERS_QUERY_PREFIX } from "@/old/_lib/constants";
import { type CheckedState } from "@radix-ui/react-checkbox";
import "client-only";
import { type ReadonlyURLSearchParams } from "next/navigation";

/**
 * Update the search parameters with changing the route or making a
 * request to the server
 */
export const updateSearchParams = (searchParams: URLSearchParams) => {
  window.history.pushState(null, "", `?${searchParams.toString()}`);
};

/**
 *  Used to toggle the filters in the URL search parameters
 */
export const toggleCheckboxInSearchparams = (
  searchParams: ReadonlyURLSearchParams,
  {
    sectionId,
    valueId,
    checked,
  }: { sectionId: string; valueId: string; checked: CheckedState },
) => {
  const newSearchParams = new URLSearchParams(searchParams);

  if (checked === true) {
    newSearchParams.append(`${FILTERS_QUERY_PREFIX}${sectionId}`, valueId);
  } else {
    newSearchParams.delete(`${FILTERS_QUERY_PREFIX}${sectionId}`, valueId);
  }

  window.history.pushState(null, "", `?${newSearchParams.toString()}`);
};
