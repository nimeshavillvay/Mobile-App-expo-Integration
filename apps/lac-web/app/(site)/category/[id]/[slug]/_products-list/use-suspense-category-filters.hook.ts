import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import { useSearchParams } from "next/navigation";
import { useDeferredValue } from "react";

const useSuspenseCategoryFilters = ({
  token,
  categoryId,
}: {
  token?: string;
  categoryId: string;
}) => {
  const searchParams = useSearchParams();
  // We're using "useDeferredValue" here to avoid showing the fallback UI
  // for the filters list and the selected filters display
  const deferredSearchParams = useDeferredValue(searchParams);

  const values: { [key: string]: string[] } = {};

  for (const key of deferredSearchParams.keys()) {
    if (key !== "page") {
      values[key] = deferredSearchParams.getAll(key);
    }
  }

  return useSuspenseFilters(token, {
    type: "Categories",
    id: categoryId,
    values,
  });
};

export default useSuspenseCategoryFilters;
