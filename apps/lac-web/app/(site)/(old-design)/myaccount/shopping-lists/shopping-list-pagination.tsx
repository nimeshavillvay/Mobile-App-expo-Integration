import { cn } from "@/_lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/web-ui/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

const ShoppingListPagination = ({
  page,
  totalPages,
  shoppingListId,
}: {
  readonly page: number;
  readonly totalPages: number;
  readonly shoppingListId: string;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getHref = (pageNo: number) => {
    const newUrlSearchParams = new URLSearchParams(searchParams);
    newUrlSearchParams.set("page", pageNo.toString());
    newUrlSearchParams.set("shoppingListId", shoppingListId.toString());

    return `${pathname}?${newUrlSearchParams.toString()}`;
  };

  const pages = [page - 2, page - 1, page, page + 1, page + 2].filter(
    (page) => page >= 1 && page <= totalPages,
  );

  return (
    <Pagination className="pt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              page === 1
                ? "pointer-events-none cursor-not-allowed opacity-50"
                : "",
              "btnAction",
            )}
            isActive={page !== 1}
            href={getHref(page - 1)}
          />
        </PaginationItem>

        {page - 2 > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pages.map((aPage) => (
          <PaginationItem key={aPage}>
            <PaginationLink
              href={getHref(aPage)}
              isActive={aPage === page}
              className="btnAction"
            >
              {aPage}
            </PaginationLink>
          </PaginationItem>
        ))}

        {page + 2 < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className={cn(
              page === totalPages || totalPages == 0
                ? "pointer-events-none cursor-not-allowed opacity-50"
                : "",
              "btnAction",
            )}
            isActive={page !== totalPages && totalPages !== 0}
            href={getHref(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ShoppingListPagination;
