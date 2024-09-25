"use client";

import { ProductsGridPagination } from "@/_components/products-grid";
import useSuspenseCategoryFilters from "./use-suspense-category-filters.hook";
import useSuspenseSearchProductList from "./use-suspense-search-product-list.hook";

type ProductsListPaginationProps = {
  readonly token?: string;
  readonly categoryId: string;
};

const ProductsListPagination = ({
  token,
  categoryId,
}: ProductsListPaginationProps) => {
  const categoryFiltersQuery = useSuspenseCategoryFilters({
    token,
    categoryId,
  });
  const searchQuery = useSuspenseSearchProductList(
    token,
    categoryId,
    categoryFiltersQuery.data,
  );

  const totalPages = Math.max(
    Math.ceil(searchQuery.data.pagination.totalCount / 20),
    1,
  );

  return <ProductsGridPagination totalPages={totalPages} />;
};

export default ProductsListPagination;
