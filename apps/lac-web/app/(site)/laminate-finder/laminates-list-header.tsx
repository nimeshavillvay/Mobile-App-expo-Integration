"use client";

import { useFilterParams } from "@/_components/products-grid";
import useSuspenseLaminateFilters from "@/_hooks/laminate/use-suspense-laminate-filters.hook";
import useSuspenseSearchLaminateList from "@/_hooks/laminate/use-suspense-search-laminate-list.hook";
import { INIT_PER_PAGE, QUERY_KEYS } from "@/_lib/constants";
import { LaminatesGridHeader } from "./laminates-grid-header";

type LaminatesListHeaderProps = {
  readonly token: string;
};

const LaminatesListHeader = ({ token }: LaminatesListHeaderProps) => {
  const categoryFiltersQuery = useSuspenseLaminateFilters({
    token,
  });
  const searchQuery = useSuspenseSearchLaminateList(
    token,
    categoryFiltersQuery.data,
  );

  const { searchParams } = useFilterParams(categoryFiltersQuery.data);

  if (searchQuery.data.pagination.totalCount === 0) {
    return null;
  }

  const perPage = searchParams.get(QUERY_KEYS.PER_PAGE) ?? INIT_PER_PAGE;
  const totalPages = Math.ceil(
    searchQuery.data.pagination.totalCount / Number(perPage),
  );

  return (
    <LaminatesGridHeader
      totalCount={searchQuery.data.pagination.totalCount}
      totalPages={totalPages}
    />
  );
};

export default LaminatesListHeader;
