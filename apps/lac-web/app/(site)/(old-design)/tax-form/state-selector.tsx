"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import { AvailableStatesList } from "./available-states-list";
import { downloadFile } from "./helpers";
import type { TaxFormItems } from "./types";

const StateSelector = ({
  taxFormDetails,
}: {
  readonly taxFormDetails: TaxFormItems;
}) => {
  const onSelectState = (stateName: keyof TaxFormItems) => {
    const splitStateDetails = stateName.split("-");
    const stateCode = splitStateDetails[0] as keyof TaxFormItems;
    const taxFormType = splitStateDetails[1];

    downloadFile(taxFormDetails, stateCode, taxFormType);
  };

  return (
    <Select onValueChange={onSelectState}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a State" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {AvailableStatesList.map((state: { label: string; code: string }) => (
            <SelectItem key={state.label} value={state.code}>
              {state.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StateSelector;
