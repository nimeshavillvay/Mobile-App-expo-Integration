"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/web-ui/components/ui/pagination";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { useFilterParams } from "./use-filter-params.hook";

export const ProductsGridPagination = ({
  totalPages,
}: {
  readonly totalPages: number;
}) => {
  const pathname = usePathname();
  const { pageNo, searchParams } = useFilterParams();

  const previousPage = pageNo - 1 < 1 ? 1 : pageNo - 1;
  const nextPage = pageNo + 1 > totalPages ? totalPages : pageNo + 1;

  const pages = new Set([1]);
  // Add 2nd page
  if (2 < totalPages) {
    pages.add(2);
  }
  // Add previous page
  pages.add(previousPage);
  // Add current page
  pages.add(pageNo);
  // Add next page
  pages.add(nextPage);
  // Add 2nd last page
  if (totalPages - 1 > 0) {
    pages.add(totalPages - 1);
  }
  // Add last page
  pages.add(totalPages);

  const getHref = (page: number) => {
    const newUrlSearchParams = new URLSearchParams(searchParams);
    newUrlSearchParams.set("page", page.toString());

    return `${pathname}?${newUrlSearchParams.toString()}`;
  };

  return (
    <Pagination className="pt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={getHref(previousPage)}
            className="btnAction"
          />
        </PaginationItem>

        {Array.from(pages).map((page) => (
          <Fragment key={page}>
            {!pages.has(page - 1) && page !== 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink
                href={getHref(page)}
                isActive={pageNo === page}
                className="btnAction"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          </Fragment>
        ))}

        <PaginationItem>
          <PaginationNext href={getHref(nextPage)} className="btnAction" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export const ProductsGridPaginationSkeleton = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-1 pt-4">
      <Skeleton className="h-9 w-28" />

      <Skeleton className="size-9" />

      <Skeleton className="size-9" />

      <Skeleton className="size-9" />

      <Skeleton className="size-9" />

      <Skeleton className="size-9" />

      <Skeleton className="h-9 w-20" />
    </div>
  );
};
