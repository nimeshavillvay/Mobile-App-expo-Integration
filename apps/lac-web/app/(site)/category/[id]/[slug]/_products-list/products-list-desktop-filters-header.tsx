"use client";

import { ProductsGridDesktopFiltersHeader } from "@/_components/products-grid";
import useSuspenseCategoryFilters from "./use-suspense-category-filters.hook";

type ProductsListDesktopFiltersHeaderProps = {
  readonly token?: string;
  readonly categoryId: string;
};

const ProductsListDesktopFiltersHeader = ({
  token,
  categoryId,
}: ProductsListDesktopFiltersHeaderProps) => {
  const categoryFiltersQuery = useSuspenseCategoryFilters({
    token,
    categoryId,
  });

  return (
    <ProductsGridDesktopFiltersHeader filters={categoryFiltersQuery.data} />
  );
};

export default ProductsListDesktopFiltersHeader;
