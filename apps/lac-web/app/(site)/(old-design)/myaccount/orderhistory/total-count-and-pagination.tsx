"use client";

import { INIT_PAGE_NUMBER } from "@/_lib/constants";
import Pagination from "@/old/_components/pagination";
import { Button } from "@/old/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/old/_components/ui/select";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  MdArrowBack,
  MdArrowForward,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { changeSearchParams } from "../_utils/client-helpers";
import { INIT_PAGE_SIZE, PAGE_SIZES, QUERY_KEYS } from "./constants";
import OrderHistoryMobilePagination from "./order-history-mobile-pagination";

type TotalCountAndPaginationProps = {
  readonly isLoading: boolean;
  readonly totalItems: number;
};

const TotalCountAndPagination = ({
  isLoading,
  totalItems,
}: TotalCountAndPaginationProps) => {
  const urlSearchParams = useSearchParams();
  const page = Number(urlSearchParams.get(QUERY_KEYS.PAGE) ?? INIT_PAGE_NUMBER);
  const perPage = Number(
    urlSearchParams.get(QUERY_KEYS.PER_PAGE) ?? INIT_PAGE_SIZE,
  );

  const totalPagesCount = Math.ceil(totalItems / perPage);

  const [openMobilePagination, setMobilePagination] = useState(false);

  const handlePerPageChange = (value: string) => {
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
    window.scrollTo(0, 0);
  };

  const onNextPage = () => {
    if (page < totalPagesCount) {
      changeSearchParams(urlSearchParams, [
        {
          key: QUERY_KEYS.PAGE,
          value: (page + 1).toString(),
        },
      ]);
    }
    window.scrollTo(0, 0);
  };

  const onPrevPage = () => {
    if (page > 1) {
      changeSearchParams(urlSearchParams, [
        {
          key: QUERY_KEYS.PAGE,
          value: (page - 1).toString(),
        },
      ]);
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="hidden flex-row items-center justify-between py-4 text-brand-gray-500 md:flex">
        {!isLoading && (
          <div>
            {(page - 1) * perPage + 1}
            {" - "}
            {Math.min(page * perPage, totalItems)} of {totalItems}
          </div>
        )}

        <div className="flex items-center gap-2">
          <div>Per Page:</div>

          <Select
            value={perPage.toString()}
            onValueChange={handlePerPageChange}
          >
            <SelectTrigger className="h-8 w-[70px] py-0">
              <SelectValue>{perPage.toString()}</SelectValue>
            </SelectTrigger>

            <SelectContent>
              {PAGE_SIZES.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {totalItems > 0 ? (
          <Pagination
            pageSize={perPage}
            totalSize={totalItems}
            currentPage={page}
            searchParams={urlSearchParams}
          />
        ) : (
          <div />
        )}
      </div>

      {/* For Mobile View */}
      <div className="container flex flex-row gap-2 py-3 md:hidden">
        <Button
          className="h-12 flex-1 bg-gray-100 text-base text-brand-gray-500"
          onClick={() => onPrevPage()}
          disabled={page === 1}
          data-button-action="Order History Mobile Previous Page"
        >
          <MdArrowBack
            className="text-xl leading-none"
            data-button-action="Order History Mobile Previous Page"
          />
          Back
        </Button>

        <Button
          className="h-12 flex-1 gap-3 border-2 border-black bg-gray-100 text-base text-black"
          onClick={() => setMobilePagination(true)}
          data-button-action="Order History Mobile Total Pagination"
        >
          {page}/{totalPagesCount}
          <MdKeyboardArrowDown
            className="text-xl leading-none"
            data-button-action="Order History Mobile Total Pagination"
          />
        </Button>

        <Button
          className="h-12 flex-1 bg-gray-100 text-base text-brand-gray-500"
          onClick={() => onNextPage()}
          disabled={page === totalPagesCount}
          data-button-action="Order History Mobile Next Page"
        >
          Next
          <MdArrowForward
            className="text-xl leading-none"
            data-button-action="Order History Mobile Next Page"
          />
        </Button>
      </div>

      <OrderHistoryMobilePagination
        open={openMobilePagination}
        setOpen={setMobilePagination}
        totalPagesCount={totalPagesCount}
      />
    </>
  );
};

export default TotalCountAndPagination;
