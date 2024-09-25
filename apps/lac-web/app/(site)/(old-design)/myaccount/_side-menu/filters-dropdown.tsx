import type { Filters } from "@/_lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/old/_components/ui/accordion";
import { type CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
import { Label } from "@repo/web-ui/components/ui/label";
import { useId } from "react";
import useFilterParams from "./use-filter-params.hook";

const FiltersDropdown = ({ filters }: { readonly filters: Filters[] }) => {
  const id = useId();
  const { selectedValues, searchParams } = useFilterParams(filters);

  const getCheckboxId = (filterId: string, valueId: number) => {
    return `${id}-checkbox-${filterId}-${valueId}`;
  };

  const checkIsChecked = (attributeId: string, valueId: number) => {
    return !!selectedValues[attributeId]?.values.find(
      (value) => value.id === valueId.toString(),
    );
  };

  const toggleCheck = (
    attributeId: string,
    valueId: number,
    checked: CheckedState,
  ) => {
    const newUrlSearchParams = new URLSearchParams(searchParams);

    if (checked === true) {
      newUrlSearchParams.append(attributeId, valueId.toString());
    } else {
      newUrlSearchParams.delete(attributeId, valueId.toString());
    }

    window.history.pushState(null, "", `?${newUrlSearchParams.toString()}`);
  };

  return (
    <Accordion type="single" collapsible>
      {filters.map((filter) => (
        <AccordionItem key={filter.id} value={filter.id}>
          <AccordionTrigger className="font-bold hover:no-underline">
            {filter.filter}
          </AccordionTrigger>

          <AccordionContent className="space-y-2">
            <ul>
              {filter.values.map((value) => (
                <li
                  key={value.id}
                  className="flex flex-row items-center gap-2 p-1"
                >
                  <Checkbox
                    id={getCheckboxId(filter.id, value.id)}
                    checked={checkIsChecked(filter.id, value.id)}
                    onCheckedChange={(checked) =>
                      toggleCheck(filter.id, value.id, checked)
                    }
                    disabled={!value.active}
                  />

                  <Label htmlFor={getCheckboxId(filter.id, value.id)}>
                    {value.value}
                  </Label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FiltersDropdown;
