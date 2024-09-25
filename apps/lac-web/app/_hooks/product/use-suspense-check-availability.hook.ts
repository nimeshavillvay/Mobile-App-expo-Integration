import { checkAvailability } from "@/_lib/apis/shared";
import type {
  AvailabilityParameters,
  ShippingMethod,
  Token,
} from "@/_lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export type AvailabilityOptionPlants = {
  index: number;
  isSameDayAvail: boolean;
  plant: string;
  quantity?: number;
  backOrderQuantity?: number;
  backOrderDate?: string;
  shippingMethods: ShippingMethod[];
};

export type CheckAvailability = {
  productid: number;
  status: string;
  options: {
    backOrder: boolean;
    plants: AvailabilityOptionPlants[];
    type: string;
    hash: string;
  }[];
  willcallanywhere: {
    hash: string;
    status: string;
    willCallBackOrder: string; // Back order date
    willCallPlant: string;
    willCallQuantity: number;
    backOrder?: boolean;
    backOrderDate_1?: string;
    backOrderQuantity_1?: number;
    index?: number;
    plant_1?: string;
    quantity_1?: number;
    shippingMethods_1?: string[];
    type?: string;
  };
  xplant: string;
  available_locations: {
    location: string;
    name: string;
    amount: number;
  }[];
};

const useSuspenseCheckAvailability = (
  token: Token | undefined,
  { productId, qty, plant }: AvailabilityParameters,
) => {
  return useSuspenseQuery({
    queryKey: [
      "user",
      "product",
      "availability",
      {
        productId,
        qty,
        plant,
      },
      token,
    ],
    queryFn: () => checkAvailability(token, { productId, qty, plant }),
  });
};

export default useSuspenseCheckAvailability;
