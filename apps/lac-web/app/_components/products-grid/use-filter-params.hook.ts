"use client";

import type { Filters } from "@/_lib/types";
import { useSearchParams } from "next/navigation";
import { QUERY_KEYS } from "./constants";

export type SelectedValues = {
  [attributeId: string]: {
    name: string;
    values: { id: string; name: string }[];
  };
};

export const useFilterParams = (filters: Filters[] = []) => {
  const searchParams = useSearchParams();

  const pageNoValue = searchParams.get(QUERY_KEYS.page) ?? "1";
  const pageNo = !isNaN(parseInt(pageNoValue)) ? parseInt(pageNoValue) : 1;

  // Check for selected values
  const selectedValues: SelectedValues = {};
  filters.forEach((attribute) => {
    const paramsValues = searchParams.getAll(attribute.id);
    if (paramsValues.length) {
      const values: { id: string; name: string }[] = [];

      paramsValues.forEach((paramValue) => {
        const value = attribute.values.find(
          (value) => value.id.toString() === paramValue,
        );
        if (value) {
          values.push({
            id: value.id.toString(),
            name: value.value,
          });
        }
      });

      selectedValues[attribute.id] = {
        name: attribute.filter,
        values,
      };
    }
  });

  return { pageNo, selectedValues, searchParams };
};
