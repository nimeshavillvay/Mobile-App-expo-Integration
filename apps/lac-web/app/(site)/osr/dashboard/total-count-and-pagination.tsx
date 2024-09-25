"use client";

import { changeSearchParams } from "@/_lib/client-helpers";
import { QUERY_KEYS } from "@/_lib/constants";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { PER_PAGE } from "./constants";
import MobilePagination from "./mobile-pagination";
import Pagination from "./pagination";

const TotalCountAndPagination = ({
  isLoading,
  page,
  totalItems,
}: {
  readonly isLoading: boolean;
  readonly page: number;
  readonly totalItems: number;
}) => {
  const searchParams = useSearchParams();
  const totalPagesCount = Math.ceil(totalItems / PER_PAGE);
  const [openMobilePagination, setOpenMobilePagination] = useState(false);

  const paginate = (page: number) => {
    changeSearchParams(searchParams, [
      {
        key: QUERY_KEYS.PAGE,
        value: page.toString(),
      },
    ]);
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="my-6 hidden flex-row justify-between text-brand-gray-400 md:flex">
          {!isLoading && (
            <div className="min-w-32">
              {(page - 1) * PER_PAGE + 1} -{" "}
              {Math.min(page * PER_PAGE, totalItems)} of {totalItems}
            </div>
          )}

          {totalItems > 0 && (
            <Pagination
              pageSize={PER_PAGE}
              totalSize={totalItems}
              currentPage={page}
            />
          )}
        </div>
      </div>
      <div className="overflow-hidden py-3 md:hidden">
        <div className="flex flex-row justify-center gap-1 font-bold">
          <button
            className="btnAction flex flex-row items-center bg-gray-100 px-3 py-3 text-base uppercase text-brand-gray-400"
            onClick={() => {
              paginate(page - 1);
            }}
            data-button-action="OSR Pagination Back"
          >
            <MdArrowBack
              className="mr-[5px] text-2xl leading-none"
              data-button-action="OSR Pagination Back"
            />
            Back
          </button>

          <button
            className="btnAction text-brand-[#000] flex w-full max-w-28 flex-row items-center justify-center rounded-sm border-2 border-black bg-gray-100 px-3 py-3 text-base font-bold uppercase"
            onClick={() => setOpenMobilePagination(true)}
            data-button-action="OSR Pagination"
          >
            {page}/{totalPagesCount}
            <ChevronDown
              className="h-5 w-8 shrink-0"
              data-button-action="OSR Pagination"
            />
          </button>

          <button
            className="btnAction flex flex-row items-center bg-gray-100 px-3 py-3 uppercase text-brand-gray-400"
            onClick={() => {
              paginate(page + 1);
            }}
            data-button-action="OSR Pagination Next"
          >
            Next
            <MdArrowForward
              className="ml-[5px] text-2xl leading-none"
              data-button-action="OSR Pagination Next"
            />
          </button>
        </div>

        <MobilePagination
          open={openMobilePagination}
          setOpen={setOpenMobilePagination}
          totalPagesCount={totalPagesCount}
        />
      </div>
    </>
  );
};

export default TotalCountAndPagination;
