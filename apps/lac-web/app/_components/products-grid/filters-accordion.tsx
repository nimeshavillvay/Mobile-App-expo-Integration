import type { Filters } from "@/_lib/types";
import { type CheckedState } from "@radix-ui/react-checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/web-ui/components/ui/accordion";
import { Checkbox } from "@repo/web-ui/components/ui/checkbox";
import { Label } from "@repo/web-ui/components/ui/label";
import { useId } from "react";
import { QUERY_KEYS } from "./constants";
import { useFilterParams } from "./use-filter-params.hook";

type FiltersAccordionProps = {
  readonly filters: Filters[];
};

const FiltersAccordion = ({ filters }: FiltersAccordionProps) => {
  const id = useId();
  const getCheckboxId = (filterId: string, valueId: number) => {
    return `${id}-checkbox-${filterId}-${valueId}`;
  };

  const { selectedValues, searchParams } = useFilterParams(filters);

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
    newUrlSearchParams.delete(QUERY_KEYS.page);

    window.history.pushState(null, "", `?${newUrlSearchParams.toString()}`);
  };

  return (
    <Accordion type="single" collapsible className="btn-faceted-nav space-y-1">
      {filters.map((filter) => (
        <AccordionItem key={filter.id} value={filter.id}>
          <AccordionTrigger>{filter.filter}</AccordionTrigger>

          <AccordionContent>
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
                    className="btnAction"
                    data-button-action="Filter Results"
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

export default FiltersAccordion;
