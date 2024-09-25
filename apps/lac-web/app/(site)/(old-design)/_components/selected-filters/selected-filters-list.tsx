"use client";

import { cn } from "@/_lib/utils";
import { FILTERS_QUERY_PREFIX } from "@/old/_lib/constants";
import { updateSearchParams } from "@/old/_utils/client-helpers";
import { useSearchParams } from "next/navigation";
import { type ComponentProps } from "react";
import { MdClose } from "react-icons/md";

type SelectedFiltersListProps = {
  readonly sections: {
    id: string;
    name: string;
    values: {
      id: string;
      name: string;
    }[];
  }[];
};

const SelectedFiltersList = ({ sections }: SelectedFiltersListProps) => {
  const searchParams = useSearchParams();

  const selectedSections = sections
    .map((section) => {
      const selectedFilters = searchParams.getAll(
        `${FILTERS_QUERY_PREFIX}${section.id}`,
      );
      const selectedValues = section.values.filter((value) =>
        selectedFilters.includes(value.id),
      );

      return {
        ...section,
        values: selectedValues,
      };
    })
    .filter((section) => !!section.values.length);

  const removeFilter = (sectionId: string, valueId: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(`${FILTERS_QUERY_PREFIX}${sectionId}`, valueId);

    updateSearchParams(newSearchParams);
  };

  const removeAll = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    selectedSections.forEach((section) => {
      newSearchParams.delete(`${FILTERS_QUERY_PREFIX}${section.id}`);
    });

    updateSearchParams(newSearchParams);
  };

  if (!selectedSections.length) {
    return null;
  }

  return (
    <div className="sticky top-0 z-10 bg-white py-3.5">
      <div className="flex flex-row items-center justify-between gap-6 bg-brand-gray-200 p-2">
        <div className="text-brand-gray-500">Active Filters</div>

        <ul className="flex flex-1 flex-row flex-nowrap items-center gap-[2px] overflow-x-auto">
          {selectedSections.flatMap((section) =>
            section.values.map((value) => (
              <Button
                key={`${section.id}-${value.id}`}
                onClick={() => removeFilter(section.id, value.id)}
                className="flex flex-row items-center gap-[5px]"
              >
                <MdClose
                  className="text-lg leading-none"
                  data-button-action="Remove Filters"
                />
                <span data-button-action="Remove Filters">{`${section.name} : ${value.name}`}</span>
              </Button>
            )),
          )}
        </ul>

        <Button onClick={removeAll} data-button-action="Remove All Filters">
          All
        </Button>
      </div>
    </div>
  );
};

export default SelectedFiltersList;

const Button = ({ className, ...delegated }: ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "btnAction min-w-0 shrink-0 text-nowrap rounded-[3px] bg-brand-primary px-5 py-1.5 text-base font-normal uppercase text-white",
        className,
      )}
      {...delegated}
    />
  );
};
