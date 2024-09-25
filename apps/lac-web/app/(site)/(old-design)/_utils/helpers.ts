import { AVAILABILITY_STATUSES } from "@/old/_lib/constants";
import type { UOM, UOMLabel } from "@/old/_lib/types";

export const formatNumberToPrice = (value: number) => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const splitArrayIntoChunks = <T>(array: T[], chunkSize: number) => {
  const result: T[][] = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }

  return result;
};

export const getUomLabel = (uom: UOM): UOMLabel => {
  if (uom === "PR") {
    return "Pair";
  } else if (uom === "EA") {
    return "Each";
  } else if (uom === "BX") {
    return "Box";
  } else if (uom === "SH") {
    return "Sheet";
  } else if (uom === "RL") {
    return "Roll";
  } else if (uom === "ST") {
    return "Set";
  } else {
    throw new Error("Invalid UOM");
  }
};

/**
 * Get the label of the status in the availability checl
 */
export const getStatusLabel = (status: string) => {
  if (status === AVAILABILITY_STATUSES.IN_STOCK) {
    return "In Stock";
  } else if (status === AVAILABILITY_STATUSES.NOT_IN_STOCK) {
    return "Not In Stock";
  }

  return "";
};

export const base64Encode = (value: string) => {
  return Buffer.from(value).toString("base64");
};
