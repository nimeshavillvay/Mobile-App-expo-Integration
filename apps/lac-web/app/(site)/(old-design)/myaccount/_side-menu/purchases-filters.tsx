import useSuspenseFilters from "@/_hooks/search/use-suspense-filters.hook";
import { useSearchParams } from "next/navigation";
import { useDeferredValue } from "react";
import { INIT_FROM_DATE, INIT_TO_DATE } from "./constants";
import FiltersDropdown from "./filters-dropdown";

type PurchasesFiltersProps = {
  readonly token: string;
};

const PurchasesFilters = ({ token }: PurchasesFiltersProps) => {
  const searchParams = useSearchParams();
  const deferredSearchParams = useDeferredValue(searchParams);
  const fromDate = deferredSearchParams.get("from") ?? INIT_FROM_DATE;
  const toDate = deferredSearchParams.get("to") ?? INIT_TO_DATE;
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

  return <FiltersDropdown filters={filtersQuery.data} />;
};

export default PurchasesFilters;
