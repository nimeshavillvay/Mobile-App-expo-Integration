import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import type {
  Address,
  AddressCheckSuggestions,
  AddressFormData,
} from "@/_lib/types";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type BillingAddressResponse = {
  "xc-addressid": string;
  soldto: string;
  "country-name": string;
  county: string;
  locality: string;
  organization: string;
  "phone-number": string;
  region: string;
  "street-address": string;
  "postal-code": string;
  zip4: string;
};

type BillingAddressSuggestions = {
  "country-name": string;
  county: string;
  locality: string;
  region: string;
  "street-address": string;
  "postal-code": string;
  zip4: string;
};

type BillingAddressSuggestionsResponse = {
  check_type: string;
  message: string;
  suggestions: BillingAddressSuggestions[];
};

const useUpdateBillingAddressMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (billingAddressFormData: AddressFormData) => {
      const response = await api
        .put("rest/my-account/billing-address", {
          headers: {
            authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: {
            "country-name": billingAddressFormData.country,
            county: billingAddressFormData.county,
            locality: billingAddressFormData.city,
            organization: billingAddressFormData.company,
            "phone-number": billingAddressFormData.phoneNumber,
            region: billingAddressFormData.state,
            "street-address": billingAddressFormData.addressLineOne,
            "postal-code": billingAddressFormData.zipCode,
            zip4: billingAddressFormData.zip4,
            ...(billingAddressFormData.skipAddressCheck !== undefined && {
              skip_address_check: billingAddressFormData.skipAddressCheck,
            }),
          },
        })
        .json<BillingAddressSuggestionsResponse | BillingAddressResponse>();

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
        toast({
          description: "Billing address updated",
        });

        const shippingResponse: Address = {
          xcAddressId: response["xc-addressid"],
          soldTo: response.soldto,
          countryName: response["country-name"],
          county: response.county,
          locality: response.locality,
          organization: response.organization,
          phoneNumber: response["phone-number"],
          region: response.region,
          streetAddress: response["street-address"],
          postalCode: response["postal-code"],
          zip4: response.zip4 ?? null,
        };

        return shippingResponse;
      }
    },
    onMutate: () => {
      toast({ description: "Updating billing address" });
    },
    onError: () => {
      toast({
        description: "Failed to update the billing address",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-account", "billing-address"],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-account", "shipping-addresses"],
      });
    },
  });
};

export default useUpdateBillingAddressMutation;
