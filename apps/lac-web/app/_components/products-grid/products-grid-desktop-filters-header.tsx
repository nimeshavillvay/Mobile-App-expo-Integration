"use client";

import type { Filters } from "@/_lib/types";
import { Close } from "@repo/web-ui/components/icons/close";
import { Button } from "@repo/web-ui/components/ui/button";
import { Separator } from "@repo/web-ui/components/ui/separator";
import { QUERY_KEYS } from "./constants";
import { useFilterParams, type SelectedValues } from "./use-filter-params.hook";

export const ProductsGridDesktopFiltersHeader = ({
  filters,
}: {
  readonly filters: Filters[];
}) => {
  const { selectedValues, searchParams } = useFilterParams(filters);
  const mappedSelectedValues: (SelectedValues[string] & { id: string })[] = [];
  for (const [key, value] of Object.entries(selectedValues)) {
    mappedSelectedValues.push({ ...value, id: key });
  }

  const clear = (attributeId: string, valueId?: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(attributeId, valueId);
    newParams.delete(QUERY_KEYS.page);
    window.history.pushState(null, "", `?${newParams.toString()}`);
  };

  const clearAll = () => {
    const newParams = new URLSearchParams(searchParams);

    mappedSelectedValues.forEach((selectedValue) => {
      newParams.delete(selectedValue.id);
    });
    newParams.delete(QUERY_KEYS.page);
    newParams.delete(QUERY_KEYS.searchText);

    window.history.pushState(null, "", `?${newParams.toString()}`);
  };

  if (mappedSelectedValues.length === 0) {
    return null;
  }

  return (
    <div className="hidden flex-wrap md:flex md:flex-row md:items-center md:gap-2">
      {mappedSelectedValues.map((selectedValue) => (
        <AttributePill
          key={selectedValue.id}
          id={selectedValue.id}
          name={selectedValue.name}
          values={selectedValue.values}
          clear={clear}
        />
      ))}

      <Button
        variant="ghost"
        className="flex h-fit flex-row items-center gap-2.5 rounded-full px-4 py-2.5"
        onClick={clearAll}
      >
        <span className="text-sm font-bold">Clear all</span>

        <Close width={16} height={16} data-button-action="Clear All Filters" />
      </Button>
    </div>
  );
};

const AttributePill = ({
  id,
  name,
  values,
  clear,
}: {
  readonly id: string;
  readonly name: string;
  readonly values: { name: string; id: string }[];
  readonly clear: (attributeId: string, valueId?: string) => void;
}) => {
  return (
    <div className="flex flex-row items-center gap-2 rounded-full border border-wurth-gray-250 bg-white px-4 py-2.5 shadow-sm">
      <span className="text-sm font-medium text-wurth-gray-800">{name}</span>

      <Separator orientation="vertical" className="h-5" />

      <ul className="flex flex-row items-center gap-1">
        {values.length < 3 ? (
          values.map((value) => (
            <li key={value.id}>
              <Button
                variant="subtle"
                className="flex h-fit flex-row items-center gap-2 rounded-sm px-1 py-0.5"
                onClick={() => clear(id, value.id)}
              >
                <span className="text-xs font-normal text-wurth-gray-800">
                  {value.name}
                </span>

                <Close
                  width={12}
                  height={12}
                  data-button-action={`Clear Filter ${value.name}`}
                />
              </Button>
            </li>
          ))
        ) : (
          <li>
            <Button
              variant="subtle"
              className="flex h-fit flex-row items-center gap-2 rounded-sm px-1 py-0.5"
              onClick={() => clear(id)}
            >
              <span className="text-xs font-normal text-wurth-gray-800">
                {values.length} selected
              </span>

              <Close
                width={12}
                height={12}
                data-button-action={`Clear Filter ${name}`}
              />
            </Button>
          </li>
        )}
      </ul>
    </div>
  );
};
