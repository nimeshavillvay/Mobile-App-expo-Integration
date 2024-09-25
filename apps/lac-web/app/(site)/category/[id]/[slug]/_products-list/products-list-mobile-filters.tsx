"use client";

import { ProductsGridMobileFiltersHeader } from "@/_components/products-grid";
import useSuspenseCategoryFilters from "./use-suspense-category-filters.hook";

type ProductsListMobileFiltersProps = {
  readonly token?: string;
  readonly categoryId: string;
};

const ProductsListMobileFilters = ({
  token,
  categoryId,
}: ProductsListMobileFiltersProps) => {
  const categoryFiltersQuery = useSuspenseCategoryFilters({
    token,
    categoryId,
  });

  return (
    <ProductsGridMobileFiltersHeader filters={categoryFiltersQuery.data} />
  );
};

export default ProductsListMobileFilters;
