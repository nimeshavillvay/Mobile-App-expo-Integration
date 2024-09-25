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
  soldto: string;
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
  soldTo: address["soldto"],
});

const useSuspenseBillingAddress = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["my-account", "billing-address", token],
    queryFn: () =>
      api
        .get("rest/my-account/billing-address", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          cache: "no-cache",
        })
        .json<AddressResponse>(),

    select: (billingAddress: AddressResponse) =>
      transformAddress(billingAddress),
  });
};

export default useSuspenseBillingAddress;
