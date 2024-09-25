"use client";

import { INIT_PAGE_NUMBER } from "@/_lib/constants";
import { cn } from "@/_lib/utils";
import { Button } from "@/old/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/old/_components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { useState, type Dispatch, type SetStateAction } from "react";
import { MdCheck } from "react-icons/md";
import { changeSearchParams } from "../_utils/client-helpers";
import { QUERY_KEYS } from "./constants";

type OrderHistoryMobilePaginationProps = {
  readonly open: boolean;
  readonly setOpen: Dispatch<SetStateAction<boolean>>;
  readonly totalPagesCount: number;
};

const OrderHistoryMobilePagination = ({
  open,
  setOpen,
  totalPagesCount,
}: OrderHistoryMobilePaginationProps) => {
  const urlSearchParams = useSearchParams();
  const currentPage = Number(
    urlSearchParams.get(QUERY_KEYS.PAGE) ?? INIT_PAGE_NUMBER,
  );

  const [page, setPage] = useState(currentPage);

  const pagesList = Array.from({ length: totalPagesCount }, (_, i) => i + 1);

  const paginate = () => {
    const searchParams = [];

    searchParams.push({
      key: QUERY_KEYS.PAGE,
      value: page.toString(),
    });

    changeSearchParams(urlSearchParams, searchParams);

    setOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bottom-0 top-auto max-w-[500px] translate-y-[0%] gap-0">
        <DialogHeader>
          <DialogTitle className="text-left font-wurth text-xl font-bold capitalize md:text-center">
            Select a page
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-scroll">
          {pagesList.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={cn(
                "btnAction flex w-full items-center justify-between px-5 py-3 font-bold",
                page == pageNumber
                  ? "bg-brand-secondary bg-opacity-20 text-brand-secondary"
                  : "",
              )}
              data-button-action="Order History Set Page Number"
            >
              Page {pageNumber}
              <MdCheck
                className={cn(
                  "text-3xl leading-none text-brand-secondary",
                  page == pageNumber ? "block" : "hidden",
                )}
                data-button-action="Order History Set Page Number"
              />
            </button>
          ))}
        </div>

        <DialogFooter className="px-5 py-6">
          <Button className="w-full p-6" onClick={() => paginate()}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderHistoryMobilePagination;
