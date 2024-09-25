"use client";

import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { useFilterParams } from "./use-filter-params.hook";

export const ProductsGridHeader = ({
  totalCount,
  totalPages,
}: {
  readonly totalCount: number;
  readonly totalPages: number;
}) => {
  const { pageNo } = useFilterParams([]);

  return (
    <div className="flex flex-row items-end justify-between text-wurth-gray-800">
      <div className="font-title text-lg font-medium tracking-normal md:text-3xl md:tracking-[-0.01406rem]">
        {totalCount} {totalCount === 1 ? "Result" : "Results"}
      </div>
      <div className="flex items-center gap-4 text-nowrap text-sm font-normal md:text-base">
        Page {pageNo} of {totalPages}
      </div>
    </div>
  );
};

export const ProductsGridHeaderSkeleton = () => {
  return (
    <div className="flex flex-row items-end justify-between">
      <Skeleton className="h-7 w-24 md:h-9 md:w-36" />

      <Skeleton className="h-5 w-20 md:h-6 md:w-24" />
    </div>
  );
};
