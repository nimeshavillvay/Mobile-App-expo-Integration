import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseWillCallPlant = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["user", "will-call-plant", token],
    queryFn: () =>
      api
        .get("rest/my-account/will-call-plant", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        })
        .json<{
          plant: string;
          name: string;
          willcall_method: string;
          pickup_plant: string;
          address?: {
            "country-name": string;
            locality: string;
            "phone-number": string;
            region: string;
            "street-address": string;
            "postal-code": string;
          };
          operation_hours?: string;
          gmap?: string;
        }>(),
    select: (data) => ({
      plantCode: data.plant,
      plantName: data.name,
      willCallMethod: data.willcall_method,
      pickupPlant: data.pickup_plant,
      address: {
        countryName: data.address?.["country-name"],
        locality: data.address?.locality,
        phoneNumber: data.address?.["phone-number"],
        region: data.address?.region,
        streetAddress: data.address?.["street-address"],
        postalCode: data.address?.["postal-code"],
      },
      operationHours: data.operation_hours,
      gmap: data.gmap,
    }),
  });
};

export default useSuspenseWillCallPlant;
