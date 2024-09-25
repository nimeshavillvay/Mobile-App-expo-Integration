import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseCreditCardSignature = (token: string) => {
  return useSuspenseQuery({
    queryKey: ["credit-card-signature", token],
    queryFn: () =>
      api
        .get("rest/my-account/creditcard-signature", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        })
        .json<{
          accountid: number;
          requestid: string;
          status: string;
          message: string;
        }>(),
    select: (data) => ({
      accountId: data.accountid,
      requestId: data.requestid,
      status: data.status,
      message: data.message,
    }),
    staleTime: Infinity,
  });
};

export default useSuspenseCreditCardSignature;
