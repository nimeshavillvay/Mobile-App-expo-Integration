"use client";

import { ProductsGridPagination } from "@/_components/products-grid";
import useSuspenseLaminateFilters from "@/_hooks/laminate/use-suspense-laminate-filters.hook";
import useSuspenseSearchLaminateList from "@/_hooks/laminate/use-suspense-search-laminate-list.hook";
import { INIT_PER_PAGE, QUERY_KEYS } from "@/_lib/constants";
import { useSearchParams } from "next/navigation";

type ProductsListPaginationProps = {
  readonly token: string;
};

const ProductsListPagination = ({ token }: ProductsListPaginationProps) => {
  const categoryFiltersQuery = useSuspenseLaminateFilters({
    token,
  });
  const searchQuery = useSuspenseSearchLaminateList(
    token,
    categoryFiltersQuery.data,
  );

  const urlSearchParams = useSearchParams();
  const perPage = urlSearchParams.get(QUERY_KEYS.PER_PAGE) ?? INIT_PER_PAGE;

  if (searchQuery.data.pagination.totalCount === 0) {
    return null;
  }

  const totalPages = Math.ceil(
    searchQuery.data.pagination.totalCount / Number(perPage),
  );

  return <ProductsGridPagination totalPages={totalPages} />;
};

export default ProductsListPagination;
