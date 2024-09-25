import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import useSuspenseShippingAddressList from "../address/use-suspense-shipping-address-list.hook";

/**
 * Call this hook only when the user is logged in.
 */
const useSuspenseProductExcluded = (token: string, productId: number) => {
  const shippingAddressListQuery = useSuspenseShippingAddressList(token);

  const selectedShippingAddress = shippingAddressListQuery.data?.find(
    (address) => address.default,
  );

  return useSuspenseQuery({
    queryKey: [
      "user",
      "product-exclusion",
      token,
      productId,
      {
        country: selectedShippingAddress?.countryName,
        region: selectedShippingAddress?.region,
        county: selectedShippingAddress?.county,
      },
    ],
    queryFn: () =>
      api
        .post(`rest/exclusion/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          json: {
            country: selectedShippingAddress?.countryName ?? "",
            region: selectedShippingAddress?.region ?? "",
            county: selectedShippingAddress?.county ?? "",
          },
          cache: "no-cache",
        })
        .json<{
          is_excluded: boolean;
        }>(),
    select: (data) => {
      return {
        isExcluded: data.is_excluded,
      };
    },
  });
};

export default useSuspenseProductExcluded;
