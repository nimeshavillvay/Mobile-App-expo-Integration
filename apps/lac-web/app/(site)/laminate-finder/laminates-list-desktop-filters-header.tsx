"use client";

import { ProductsGridDesktopFiltersHeader } from "@/_components/products-grid";
import useSuspenseLaminateFilters from "@/_hooks/laminate/use-suspense-laminate-filters.hook";

type LaminatesListDesktopFiltersHeaderProps = {
  readonly token: string;
};

const LaminatesListDesktopFiltersHeader = ({
  token,
}: LaminatesListDesktopFiltersHeaderProps) => {
  const categoryFiltersQuery = useSuspenseLaminateFilters({
    token,
  });

  return (
    <ProductsGridDesktopFiltersHeader filters={categoryFiltersQuery.data} />
  );
};

export default LaminatesListDesktopFiltersHeader;
