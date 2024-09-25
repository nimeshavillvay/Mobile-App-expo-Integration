import type { ShippingMethod } from "@/_lib/types";
import type { MAIN_OPTIONS, SHIP_TO_ME } from "../constants";

export type OptionPlant = {
  isSameDayAvail: boolean;
  plant: string;
  quantity?: number;
  backOrderQuantity?: number;
  backOrderDate?: string;
  shippingMethods: ShippingMethod[];
};

export type ShipToMeOption = typeof SHIP_TO_ME | undefined;

export type WillCallOption =
  | typeof MAIN_OPTIONS.WILL_CALL
  | typeof MAIN_OPTIONS.WILL_CALL_TRANSFER;

export type MainOption = (typeof MAIN_OPTIONS)[keyof typeof MAIN_OPTIONS];
export type BackOrderOption =
  (typeof MAIN_OPTIONS.BACK_ORDER)[keyof typeof MAIN_OPTIONS.BACK_ORDER];
export type ViewportTypes = "desktop" | "mobile";
