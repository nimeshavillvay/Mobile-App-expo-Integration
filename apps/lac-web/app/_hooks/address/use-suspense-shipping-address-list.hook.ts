import { api } from "@/_lib/api";
import type { Address } from "@/_lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";

type AddressResponse = {
  "xc-addressid": string;
  "country-name": string;
  county: string;
  locality: string;
  organization: string;
  "phone-number": string;
  region: string;
  "street-address": string;
  "postal-code": string;
  zip4: string;
  "ship-to": string;
  default: boolean;
  default_shipping: string | boolean;
  route_info: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    route: string | null;
    routeName: string;
  };
};

const transformAddress = (address: AddressResponse): Address => ({
  xcAddressId: address["xc-addressid"],
  countryName: address["country-name"],
  county: address["county"],
  locality: address["locality"],
  organization: address["organization"],
  phoneNumber: address["phone-number"],
  region: address["region"],
  streetAddress: address["street-address"],
  postalCode: address["postal-code"],
  zip4: address["zip4"],
  shipTo: address["ship-to"],
  default: address["default"],
  defaultShipping: address["default_shipping"],
  routeInfo: address.route_info,
});

const useSuspenseShippingAddressList = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["my-account", "shipping-addresses", token],
    queryFn: () =>
      api
        .get("rest/my-account/shipping-address", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        })
        .json<AddressResponse[]>(),
    select: (addresses: AddressResponse[]) => {
      const mappedAddresses = addresses.map(transformAddress);

      return mappedAddresses;
    },
  });
};

export default useSuspenseShippingAddressList;
