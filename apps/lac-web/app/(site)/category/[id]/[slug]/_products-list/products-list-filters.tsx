"use client";

import { ProductsGridFilters } from "@/_components/products-grid";
import useSuspenseCategoryFilters from "./use-suspense-category-filters.hook";

type ProductsListFiltersProps = {
  readonly token?: string;
  readonly categoryId: string;
};

const ProductsListFilters = ({
  token,
  categoryId,
}: ProductsListFiltersProps) => {
  const categoryFiltersQuery = useSuspenseCategoryFilters({
    token,
    categoryId,
  });

  return <ProductsGridFilters filters={categoryFiltersQuery.data} />;
};

export default ProductsListFilters;
