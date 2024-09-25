"use client";

import { useFilterParams } from "@/_components/products-grid/use-filter-params.hook";
import { changeSearchParams } from "@/_lib/client-helpers";
import { INIT_PAGE_NUMBER, INIT_PER_PAGE, QUERY_KEYS } from "@/_lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { useSearchParams } from "next/navigation";

export const LaminatesGridHeader = ({
  totalCount,
  totalPages,
}: {
  readonly totalCount: number;
  readonly totalPages: number;
}) => {
  const { pageNo } = useFilterParams([]);

  const pageSizes = ["20", "40", "60", "80"];
  const urlSearchParams = useSearchParams();

  const perPage = Number(
    urlSearchParams.get(QUERY_KEYS.PER_PAGE) ?? INIT_PER_PAGE,
  );

  return (
    <div className="flex flex-row items-end justify-between text-wurth-gray-800">
      <div className="font-title text-lg font-medium tracking-normal md:text-3xl md:tracking-[-0.01406rem]">
        {totalCount} {totalCount === 1 ? "Result" : "Results"}
      </div>
      <div className="flex items-center gap-4">
        <Select
          value={perPage.toString()}
          onValueChange={(value) => {
            changeSearchParams(urlSearchParams, [
              {
                key: QUERY_KEYS.PAGE,
                value: INIT_PAGE_NUMBER,
              },
              {
                key: QUERY_KEYS.PER_PAGE,
                value: value,
              },
            ]);
          }}
        >
          <SelectTrigger className="h-8 w-[70px] py-0">
            <SelectValue>{perPage.toString()}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            {pageSizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="text-nowrap text-sm font-normal md:text-base">
          Page {pageNo} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export const LaminatesGridHeaderSkeleton = () => {
  return (
    <div className="flex flex-row items-end justify-between">
      <Skeleton className="h-7 w-24 md:h-9 md:w-36" />

      <Skeleton className="h-5 w-20 md:h-6 md:w-24" />
    </div>
  );
};
