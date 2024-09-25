export type TrackingInfo = {
  plant: string;
  deliveries: {
    deliveryNo: string;
    shipDate: string;
    shippingMethod: string;
    tracker: { code: string; url: string }[];
  }[];
};

export type OrderTracker = {
  orderNo: string;
  shipToAddress: {
    attention: string;
    shipToStreet: string;
    shipToCity: string;
    shipToZip: string;
    shipToCountry: string;
    shipToRegion: string;
    shipToPhone: string;
  };
  tracking_info: TrackingInfo[];
  driverNotes: string;
};
