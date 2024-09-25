import { getGtmUser } from "@/_hooks/gtm/use-gtm-user.hook";
import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { isErrorResponse } from "@/_lib/utils";
import { sendGTMEvent } from "@next/third-parties/google";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SAPErrorResponse = {
  check_type: string;
  message: string;
};

type Address = {
  address: string;
  city: string;
  country: string;
  state: string;
  county?: string;
  postalCode: string;
  zipCode?: string;
};

const useRegisterNewUserMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  const showGenericErrorMessage = () => {
    toast({
      variant: "destructive",
      title: "Registration failed",
      description:
        "Failed to validate your shipping address. Please correct your entry.",
    });
  };

  return useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      type,
      company = "",
      industry = "",
      employees = 0,
      billingAddress,
      shippingAddress,
      skipAddressCheck = false,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      phoneNumber: string;
      type: string;
      company?: string;
      industry?: string;
      employees?: number;
      billingAddress: Address;
      shippingAddress: Address;
      skipAddressCheck?: boolean;
    }) => {
      const response = await api
        .post("rest/register/new", {
          headers: {
            Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: {
            firstName,
            lastName,
            email,
            password,
            accountType: type,
            company,
            industry,
            employees: employees.toString(),
            "billing-address": {
              "country-name": billingAddress.country,
              county: billingAddress.county,
              locality: billingAddress.city,
              organization: company,
              "phone-number": phoneNumber,
              region: billingAddress.state,
              "street-address": billingAddress.address,
              "postal-code": billingAddress.postalCode,
              zip4: billingAddress.zipCode ?? "",
              skip_address_check: skipAddressCheck,
            },
            "shipping-address": {
              "country-name": shippingAddress.country,
              county: shippingAddress.county,
              locality: shippingAddress.city,
              organization: company,
              "phone-number": phoneNumber,
              region: shippingAddress.state,
              "street-address": shippingAddress.address,
              "postal-code": shippingAddress.postalCode,
              zip4: shippingAddress.zipCode ?? "",
              skip_address_check: skipAddressCheck,
            },
          },
        })
        .json<
          SuccessResponse | UnableToRegisterResponse | VerifyAddressResponse
        >();

      return response;
    },
    onError: async (error) => {
      if (error?.response?.status === 400) {
        const errorResponse = await error.response.json();

        if (isErrorResponse(errorResponse)) {
          showGenericErrorMessage();
        } else if (isSAPErrorResponse(errorResponse)) {
          if (
            typeof (errorResponse as SAPErrorResponse)?.message === "string"
          ) {
            toast({
              variant: "destructive",
              title: "Registration failed",
              description: errorResponse.message,
            });
          } else {
            showGenericErrorMessage();
          }
        }
      }
    },
    onSuccess: (response) => {
      if (!isVerifyAddressResponse(response)) {
        // Revalidate the queries only after the user has successfully registered
        queryClient.invalidateQueries();
      }
    },
    onSettled: async () => {
      const token = cookies[SESSION_TOKEN_COOKIE];
      if (!token) {
        return null;
      }
      const gtmUser = await getGtmUser(token);

      if (gtmUser) {
        sendGTMEvent({
          event: "sign_up",
          method: "register_page",
          userid: gtmUser?.userid,
          account_type: gtmUser?.account_type,
          account_industry: gtmUser?.account_industry,
          account_sales_category: gtmUser?.account_sales_category,
        });
      }
    },
  });
};

export default useRegisterNewUserMutation;

type SuccessResponse = {
  status_code: "OK";
  type: string;
  id: number;
};
type UnableToRegisterResponse = {
  check_type: string;
  message: string;
  suggestions: unknown[];
};

export type ResponseAddress = {
  "country-name": string;
  county: string;
  locality: string;
  region: string;
  "street-address": string;
  "postal-code": string;
  zip4: string;
  skip_address_check?: boolean;
};
type VerifyAddressResponse = {
  check_type: "ADDRESS" | "SAP";
  message: string;
  suggestions: {
    "billing-address": ResponseAddress[];
    "shipping-address": ResponseAddress[];
  };
};

export const isVerifyAddressResponse = (
  data: unknown,
): data is VerifyAddressResponse => {
  if (
    typeof data === "object" &&
    ((data as VerifyAddressResponse).check_type === "ADDRESS" ||
      (data as VerifyAddressResponse).check_type === "SAP")
  ) {
    return true;
  }

  return false;
};

const isSAPErrorResponse = (error: unknown): error is SAPErrorResponse => {
  if (
    typeof error === "object" &&
    typeof (error as SAPErrorResponse)?.check_type === "string" &&
    (error as SAPErrorResponse)?.check_type === "SAP" &&
    (typeof (error as SAPErrorResponse)?.message === "string" ||
      typeof (error as SAPErrorResponse)?.message === "object")
  ) {
    return true;
  }

  return false;
};
