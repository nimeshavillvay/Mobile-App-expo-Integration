import type { Plant } from "@/_lib/types";
import React from "react";
import { MAIN_OPTIONS } from "../constants";
import PlantName from "./plant-name";

const NotAvailableInfoBanner = ({
  plants,
  willCallPlant,
  willCallType,
  willCallTransferPlant,
}: {
  readonly plants: Plant[];
  readonly willCallPlant: string;
  readonly willCallType: string;
  readonly willCallTransferPlant?: string;
}) => {
  if (willCallType === MAIN_OPTIONS.WILL_CALL_TRANSFER) {
    return (
      <div className="flex flex-col items-center gap-1 rounded-xl bg-red-800/10 px-4 py-2 text-sm">
        <div className="text-red-800">
          This item is not available for transfer from{" "}
          <PlantName plants={plants} plantCode={willCallPlant} /> to{" "}
          <PlantName
            plants={plants}
            plantCode={willCallTransferPlant ?? "N/A"}
          />
        </div>
        <div className="text-xs text-wurth-gray-500">
          To proceed, please select a valid shipping option.
        </div>
      </div>
    );
  } else if (willCallType === MAIN_OPTIONS.WILL_CALL) {
    return (
      <div className="flex flex-col items-center gap-1 rounded-xl bg-red-800/10 px-4 py-2 text-sm">
        <div className="text-red-800">
          This item is not stocked for pick up at{" "}
          <PlantName plants={plants} plantCode={willCallPlant} />
        </div>
        <div className="text-xs text-wurth-gray-500">
          To proceed, please select a valid shipping option.
        </div>
      </div>
    );
  }

  return null;
};

export default NotAvailableInfoBanner;
