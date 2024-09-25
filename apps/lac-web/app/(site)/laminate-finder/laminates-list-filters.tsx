"use client";

import { ProductsGridFilters } from "@/_components/products-grid";
import useSuspenseLaminateFilters from "@/_hooks/laminate/use-suspense-laminate-filters.hook";

type ProductsListFiltersProps = {
  readonly token: string;
};

const ProductsListFilters = ({ token }: ProductsListFiltersProps) => {
  const categoryFiltersQuery = useSuspenseLaminateFilters({
    token,
  });

  return (
    <ProductsGridFilters
      filters={categoryFiltersQuery.data.filter(
        (filter) => !filter.is_colorpicker,
      )}
    />
  );
};

export default ProductsListFilters;
