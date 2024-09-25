"use client";

import type { Filters } from "@/_lib/types";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import FiltersAccordion from "./filters-accordion";

export const ProductsGridFilters = ({
  filters,
}: {
  readonly filters: Filters[];
}) => {
  return (
    <aside className="w-[14.75rem] space-y-1">
      <h4 className="px-3 text-sm text-wurth-gray-800">Filters</h4>

      <FiltersAccordion filters={filters} />
    </aside>
  );
};

export const ProductsGridFiltersSkeleton = () => {
  return <Skeleton className="h-[109rem] w-[14.75rem]" />;
};
