"use client";

import { QUERY_KEYS } from "@/_lib/constants";
import {
  Pagination as PaginationComponent,
  PaginationLink as PaginationComponentLink,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@repo/web-ui/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
  readonly pageSize: number;
  readonly totalSize: number;
  readonly currentPage: number;
};

const Pagination = ({ pageSize, totalSize, currentPage }: PaginationProps) => {
  const searchParams = useSearchParams();
  const noOfPages = Math.ceil(totalSize / pageSize);
  const pathname = usePathname();

  const getHref = (pageNo: number) => {
    let verifiedPageNo = pageNo;

    if (pageNo <= 0) {
      verifiedPageNo = 1;
    } else if (pageNo > noOfPages) {
      verifiedPageNo = noOfPages;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QUERY_KEYS.PAGE, verifiedPageNo.toString());

    return `${pathname}?${newSearchParams.toString()}`;
  };

  const pages = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ].filter((page) => page >= 1 && page <= noOfPages);

  return (
    <PaginationComponent className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={getHref(currentPage - 1)}
            className="btnAction"
          />
        </PaginationItem>

        {currentPage - 2 > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationComponentLink
              href={getHref(page)}
              isActive={page === currentPage}
              className="btnAction"
            >
              {page}
            </PaginationComponentLink>
          </PaginationItem>
        ))}

        {currentPage + 2 < noOfPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href={getHref(currentPage + 1)}
            className="btnAction"
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
};

export default Pagination;
