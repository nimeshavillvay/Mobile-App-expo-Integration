import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import type {
  Address,
  AddressCheckSuggestions,
  AddressFormData,
} from "@/_lib/types";
import { useToast } from "@/old/_components/ui/use-toast";
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
  organization: string;
  "phone-number": string;
};

type ShippingAddressSuggestionsResponse = {
  check_type: string;
  message: string;
  suggestions: ShippingAddressSuggestions[];
};

const useUpdateShippingAddressMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (shippingAddressFormData: AddressFormData) => {
      const response = await api
        .put("rest/my-account/shipping-address", {
          headers: {
            authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: shippingAddressFormData.default
            ? {
                "ship-to": shippingAddressFormData.shipTo,
                default: true,
              }
            : {
                "xc-address-id": shippingAddressFormData.xcAddressId,
                "ship-to": shippingAddressFormData.shipTo,
                "country-name": shippingAddressFormData.country,
                county: shippingAddressFormData.county,
                region: shippingAddressFormData.state,
                locality: shippingAddressFormData.city,
                organization: shippingAddressFormData.company,
                "postal-code": shippingAddressFormData.zipCode,
                "phone-number": shippingAddressFormData.phoneNumber,
                "street-address": shippingAddressFormData.addressLineOne,
                default: shippingAddressFormData.default,
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
            organization: address.organization,
            phoneNumber: address["phone-number"],
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
          default: response.default,
        };

        return shippingResponse;
      }
    },
    onMutate: () => {
      toast({ description: "Updating shipping address" });
    },
    onSuccess: () => {
      toast({
        description: "Shipping address updated",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to update the shipping address",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-account", "shipping-addresses"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", "will-call-plant"],
      });
    },
  });
};

export default useUpdateShippingAddressMutation;
