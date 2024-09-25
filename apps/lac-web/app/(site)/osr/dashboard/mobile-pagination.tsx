"use client";

import { changeSearchParams } from "@/_lib/client-helpers";
import { QUERY_KEYS } from "@/_lib/constants";
import { cn } from "@/_lib/utils";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/web-ui/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { useState, type Dispatch, type SetStateAction } from "react";
import { MdCheck } from "react-icons/md";

export const INIT_PAGE_NUMBER = "1";
export const INIT_PER_PAGE = "10";

type FiltersForMobileProps = {
  readonly open: boolean;
  readonly setOpen: Dispatch<SetStateAction<boolean>>;
  readonly totalPagesCount: number;
};

const MobilePagination = ({
  open,
  setOpen,
  totalPagesCount,
}: FiltersForMobileProps) => {
  const urlSearchParams = useSearchParams();
  const currentPage = Number(urlSearchParams.get("page") ?? INIT_PAGE_NUMBER);

  const [page, setPage] = useState(currentPage);

  const pagesList = Array.from({ length: totalPagesCount }, (_, i) => i + 1);

  const paginate = () => {
    changeSearchParams(urlSearchParams, [
      {
        key: QUERY_KEYS.PAGE,
        value: page.toString(),
      },
    ]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="old-design-text-base overflow max-h-[80vh] max-w-[500px] gap-0 overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-left text-xl font-bold">
            Select a page
          </DialogTitle>
        </DialogHeader>
        <div>
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
              data-button-action="OSR Page"
            >
              Page {pageNumber}
              <MdCheck
                className={cn(
                  "text-3xl leading-none text-brand-secondary",
                  page == pageNumber ? "block" : "hidden",
                )}
                data-button-action="OSR Page"
              />
            </button>
          ))}
          <DialogFooter className="px-5 py-6">
            <Button
              className="w-full p-6"
              onClick={() => paginate()}
              data-button-action="OSR Pagination Update"
            >
              Done
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobilePagination;
