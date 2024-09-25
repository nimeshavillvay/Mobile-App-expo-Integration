import useCookies from "@/_hooks/storage/use-cookies.hook";
import { checkAvailability } from "@/_lib/apis/shared";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import type { AvailabilityParameters } from "@/_lib/types";
import { useMutation } from "@tanstack/react-query";

const useCheckAvailabilityMutation = () => {
  const [cookies] = useCookies();

  return useMutation({
    mutationFn: async ({ productId, qty, plant }: AvailabilityParameters) => {
      return await checkAvailability(cookies[SESSION_TOKEN_COOKIE], {
        productId,
        qty,
        plant,
      });
    },
  });
};

export default useCheckAvailabilityMutation;
