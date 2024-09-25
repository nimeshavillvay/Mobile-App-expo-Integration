"use client";

import type { Filters } from "@/_lib/types";
import { Settings } from "@repo/web-ui/components/icons/settings";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/web-ui/components/ui/drawer";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { type ComponentProps } from "react";
import FiltersAccordion from "./filters-accordion";
import { useFilterParams, type SelectedValues } from "./use-filter-params.hook";

export const ProductsGridMobileFiltersHeader = ({
  filters,
}: {
  readonly filters: Filters[];
}) => {
  const { selectedValues, searchParams } = useFilterParams(filters);
  const mappedSelectedValues: (SelectedValues[string] & { id: string })[] = [];
  for (const [key, value] of Object.entries(selectedValues)) {
    mappedSelectedValues.push({ ...value, id: key });
  }

  // Get number of selected filters
  let totalSelected = 0;
  for (const [, value] of Object.entries(selectedValues)) {
    totalSelected = totalSelected + value.values.length;
  }

  const clearAll = () => {
    const newParams = new URLSearchParams(searchParams);

    mappedSelectedValues.forEach((selectedValue) => {
      newParams.delete(selectedValue.id);
    });

    window.history.pushState(null, "", `?${newParams.toString()}`);
  };

  return (
    <div className="mb-3 flex w-full snap-x scroll-pl-4 flex-row items-center gap-2 overflow-x-auto md:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <MobileAttributePill>
            <Settings
              className="btnAction size-5"
              data-button-action="Mobile Drawer Filters & Sort"
            />

            <span
              className="flex flex-row items-center gap-1"
              data-button-action="Mobile Drawer Filters & Sort"
            >
              Filters & sort
              {totalSelected > 0 && (
                <span className="btnAction grid size-5 place-content-center rounded-full bg-wurth-gray-800 text-xs font-semibold leading-none text-white">
                  {totalSelected}
                </span>
              )}
            </span>
          </MobileAttributePill>
        </DrawerTrigger>

        <DrawerContent className="flex max-h-[95dvh] flex-col">
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription className="sr-only">
              Select your filters here.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 overflow-auto">
            <FiltersAccordion filters={filters} />
          </div>

          <DrawerFooter>
            {totalSelected > 0 && (
              <Button
                className="w-full"
                onClick={clearAll}
                data-button-action="Clear All Filters"
              >
                Clear all
              </Button>
            )}

            <DrawerClose>
              <Button
                variant="outline"
                className="w-full"
                data-button-action="Close Mobile Filter Drawer"
              >
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const MobileAttributePill = (
  props: Omit<ComponentProps<"button">, "className">,
) => {
  return (
    <button
      className="btnAction flex shrink-0 snap-start flex-row items-center gap-2 rounded-full border border-wurth-gray-250 px-4 py-3 text-sm font-medium text-wurth-gray-800 shadow-sm"
      {...props}
    />
  );
};

export const ProductsGridMobileFiltersHeaderSkeleton = () => {
  return (
    <Skeleton className="mb-3 h-[2.875rem] w-[9.125rem] rounded-full md:hidden" />
  );
};
