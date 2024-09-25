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
import { changeSearchParams } from "./client-helpers";
import { INIT_PER_PAGE, PAGE_SIZES, QUERY_KEYS } from "./constants";
import PurchasedItemsMobilePagination from "./purchased-items-mobile-pagination";

const TotalCountAndPagination = ({
  isLoading,
  totalItems,
  itemCountOnly = false,
}: {
  readonly isLoading: boolean;
  readonly totalItems: number;
  readonly itemCountOnly?: boolean;
}) => {
  const urlSearchParams = useSearchParams();
  const page = Number(urlSearchParams.get(QUERY_KEYS.PAGE) ?? INIT_PAGE_NUMBER);
  const perPage = Number(
    urlSearchParams.get(QUERY_KEYS.PER_PAGE) ?? INIT_PER_PAGE,
  );

  const totalPagesCount = Math.ceil(totalItems / perPage);

  const [openMobilePagination, setMobilePagination] = useState(false);

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
      <div className="hidden md:block">
        <div className="my-6 hidden flex-row justify-between text-brand-gray-400 md:flex">
          {!isLoading && (
            <div>
              {(page - 1) * perPage + 1} -{" "}
              {Math.min(page * perPage, totalItems)} of {totalItems}
            </div>
          )}

          {!itemCountOnly && (
            <>
              <div className="flex items-center">
                <div className="mr-2">Per Page:</div>

                <Select
                  value={perPage.toString()}
                  onValueChange={(value) => {
                    changeSearchParams(urlSearchParams, [
                      {
                        key: QUERY_KEYS.PAGE,
                        value: "1",
                      },
                      {
                        key: QUERY_KEYS.PER_PAGE,
                        value: value,
                      },
                    ]);
                    window.scrollTo(0, 0);
                  }}
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
            </>
          )}
        </div>
      </div>

      {!itemCountOnly && (
        <>
          <div className="flex flex-row justify-center gap-2 px-3 py-3 font-bold md:hidden">
            <Button
              className="h-12 flex-1 bg-gray-100 text-base text-brand-gray-500"
              onClick={() => onPrevPage()}
              disabled={page === 1}
              data-button-action="Purchase Items Mobile Previous Page"
            >
              <MdArrowBack
                className="text-xl leading-none"
                data-button-action="Purchase Items Mobile Previous Page"
              />
              Back
            </Button>

            <Button
              className="h-12 flex-1 gap-3 border-2 border-black bg-gray-100 text-base text-black"
              onClick={() => setMobilePagination(true)}
              data-button-action="Purchase Items Mobile Pagination"
            >
              {page}/{totalPagesCount}
              <MdKeyboardArrowDown
                className="text-xl leading-none"
                data-button-action="Purchase Items Mobile Pagination"
              />
            </Button>

            <Button
              className="h-12 flex-1 bg-gray-100 text-base text-brand-gray-500"
              onClick={() => onNextPage()}
              disabled={page === totalPagesCount}
              data-button-action="Purchase Items Mobile Next Page"
            >
              Next
              <MdArrowForward
                className="text-xl leading-none"
                data-button-action="Purchase Items Mobile Next Page"
              />
            </Button>
          </div>

          <PurchasedItemsMobilePagination
            open={openMobilePagination}
            setOpen={setMobilePagination}
            totalPagesCount={totalPagesCount}
          />
        </>
      )}
    </>
  );
};

export default TotalCountAndPagination;
