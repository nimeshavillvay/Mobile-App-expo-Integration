import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import type {
  Address,
  AddressCheckSuggestions,
  AddressFormData,
} from "@/_lib/types";
import { isErrorResponse } from "@/_lib/utils";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ShippingAddressResponse = {
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
};

type ShippingAddressSuggestions = {
  "country-name": string;
  county: string;
  locality: string;
  region: string;
  "street-address": string;
  "postal-code": string;
  zip4: string;
};

type ShippingAddressSuggestionsResponse = {
  check_type: string;
  message: string;
  suggestions: ShippingAddressSuggestions[];
};

const useAddShippingAddressMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (shippingAddressFormData: AddressFormData) => {
      const response = await api
        .post("rest/my-account/shipping-address", {
          headers: {
            authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: {
            region: shippingAddressFormData.state,
            locality: shippingAddressFormData.city,
            organization: shippingAddressFormData.company,
            "postal-code": shippingAddressFormData.zipCode,
            "phone-number": shippingAddressFormData.phoneNumber,
            "street-address": shippingAddressFormData.addressLineOne,
            "country-name": shippingAddressFormData.country,
            county: shippingAddressFormData.county,
            zip4: shippingAddressFormData.zip4,
            ...(shippingAddressFormData.skipAddressCheck !== undefined && {
              skip_address_check: shippingAddressFormData.skipAddressCheck,
            }),
          },
        })
        .json<ShippingAddressSuggestionsResponse | ShippingAddressResponse>();

      if ("check_type" in response) {
        toast({
          title: "Address conflicts found",
          variant: "destructive",
        });

        const suggestionsResponse: AddressCheckSuggestions = {
          checkType: response.check_type,
          message: response.message,
          suggestions: response.suggestions.map((address) => ({
            countryName: address["country-name"],
            county: address.county,
            locality: address.locality,
            region: address.region,
            streetAddress: address["street-address"],
            postalCode: address["postal-code"],
            zip4: address.zip4 ?? null,
          })),
        };

        return suggestionsResponse;
      } else {
        const shippingResponse: Address = {
          xcAddressId: response["xc-addressid"],
          countryName: response["country-name"],
          county: response.county,
          locality: response.locality,
          organization: response.organization,
          phoneNumber: response["phone-number"],
          region: response.region,
          streetAddress: response["street-address"],
          postalCode: response["postal-code"],
          zip4: response.zip4 ?? null,
          shipTo: response["ship-to"],
        };

        return shippingResponse;
      }
    },
    onMutate: () => {
      toast({ description: "Adding shipping address" });
    },
    onSuccess: (data) => {
      if ("xcAddressId" in data) {
        toast({
          description: "Shipping address added",
        });
      }
    },
    onError: async (error) => {
      let errorMessage = "Failed to add the shipping address";
      if (error?.response?.status === 400) {
        const errorResponse = await error.response.json();
        if (isErrorResponse(errorResponse)) {
          errorMessage = errorResponse.message;
        }
      }
      toast({
        title: "Failed to add address",
        description: errorMessage,
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-account", "shipping-addresses"],
      });
    },
  });
};

export default useAddShippingAddressMutation;
