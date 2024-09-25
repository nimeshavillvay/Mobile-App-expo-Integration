"use client";

import { cn } from "@/_lib/utils";
import VisuallyHidden from "@/old/_components/visually-hidden";
import { QUERY_KEYS } from "@/old/_lib/constants";
import Link, { type LinkProps } from "next/link";
import { usePathname, type ReadonlyURLSearchParams } from "next/navigation";
import { type ReactNode } from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

type PaginationProps = {
  readonly pageSize: number;
  readonly totalSize: number;
  readonly currentPage: number;
  readonly searchParams?: ReadonlyURLSearchParams;
};

const Pagination = ({
  pageSize,
  totalSize,
  currentPage,
  searchParams,
}: PaginationProps) => {
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

  // Keep adding pages till the total number becomes 5
  while (pages.length < 5) {
    let noPreviousAdded = true;
    let noNextAdded = true;

    const firstPage = pages[0];
    if (firstPage && firstPage > 1) {
      pages.unshift(firstPage - 1);
      noPreviousAdded = false;
    }

    const lastPage = pages[pages.length - 1];
    if (lastPage && lastPage < noOfPages) {
      pages.push(lastPage + 1);
      noNextAdded = false;
    }

    // No pages were added
    if (noPreviousAdded && noNextAdded) {
      break;
    }
  }

  return (
    <div className="flex flex-row items-center gap-1">
      <PaginationLink href={getHref(1)}>
        <VisuallyHidden>First page</VisuallyHidden>
        <MdOutlineKeyboardDoubleArrowLeft />
      </PaginationLink>

      <PaginationLink href={getHref(currentPage - 1)}>
        <VisuallyHidden>Previous page</VisuallyHidden>
        <MdKeyboardArrowLeft />
      </PaginationLink>

      {pages.map((page) => (
        <PaginationLink
          key={page}
          href={getHref(page)}
          isCurrent={page === currentPage}
        >
          {page}
        </PaginationLink>
      ))}

      <PaginationLink href={getHref(currentPage + 1)}>
        <VisuallyHidden>Next page</VisuallyHidden>
        <MdKeyboardArrowRight />
      </PaginationLink>

      <PaginationLink href={getHref(noOfPages)}>
        <VisuallyHidden>Last page</VisuallyHidden>
        <MdOutlineKeyboardDoubleArrowRight />
      </PaginationLink>
    </div>
  );
};

export default Pagination;

const PaginationLink = ({
  children,
  isCurrent,
  ...delegated
}: Omit<LinkProps, "className" | "scroll"> & {
  readonly children?: ReactNode;
  readonly isCurrent?: boolean;
}) => {
  return (
    <Link
      className={cn(
        "btnAction grid size-7 place-items-center rounded-sm border border-brand-gray-400 text-sm font-bold leading-[22px] text-brand-gray-500",
        isCurrent && "border-brand-primary text-brand-primary",
      )}
      {...delegated}
      data-button-action="Pagination"
    >
      {children}
    </Link>
  );
};
