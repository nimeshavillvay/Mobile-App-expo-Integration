export type ShippingMethod = {
  code: string;
  name: string;
};

// TODO: Move this type to a shared location
export type Availability = {
  productId: number;
  status: string;
  options: AvailabilityOption[];
  willCallAnywhere: WillCallAnywhere[];
  xplant: string;
  availableLocations: {
    location: string;
    name: string;
    amount: number;
  }[];
  backorderLocation: string;
};
export type WillCallAnywhere = {
  hash: string;
  status: string;
  willCallBackOrder?: string; // Back order date
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
  shippingMethod: string;
  isTransfer?: boolean;
};

export type AvailabilityOption = {
  backOrder: boolean;
  plants: {
    index: number;
    isSameDayAvail: boolean;
    plant: string;
    quantity?: number;
    backOrderQuantity?: number;
    backOrderDate?: string;
    shippingMethods: ShippingMethod[];
  }[];
  type: string;
  hash: string;
};
