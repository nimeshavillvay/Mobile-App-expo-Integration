import { updateSearchParams } from "@/old/_utils/client-helpers";
import { type ReadonlyURLSearchParams } from "next/navigation";

// Reusable helper function to get table row background color
export const getTableRowBgColor = (index: number) =>
  index % 2 === 0 ? "bg-white" : "bg-brand-gray-100";

// Reusable helper function to change search params
export const changeSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  params: { key: string; value: string }[],
) => {
  const newSearchParams = new URLSearchParams(searchParams);

  params.forEach((param) => newSearchParams.set(param.key, param.value));

  updateSearchParams(newSearchParams);
};

export const deleteSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  keys: string[],
) => {
  const newSearchParams = new URLSearchParams(searchParams);

  keys.forEach((key) => newSearchParams.delete(key));

  updateSearchParams(newSearchParams);
};
