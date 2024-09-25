"use client";

import { ProductsGridHeader } from "@/_components/products-grid";
import useSuspenseCategoryFilters from "./use-suspense-category-filters.hook";
import useSuspenseSearchProductList from "./use-suspense-search-product-list.hook";

type ProductsListHeaderProps = {
  readonly token?: string;
  readonly categoryId: string;
};

const ProductsListHeader = ({ token, categoryId }: ProductsListHeaderProps) => {
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

  return (
    <ProductsGridHeader
      totalCount={searchQuery.data.pagination.totalCount}
      totalPages={totalPages}
    />
  );
};

export default ProductsListHeader;
