import { revalidateSiteLayout } from "@/_actions/revalidate";
import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useOSRLogoutMutation = () => {
  const [cookies] = useCookies();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      api
        .get("rest/auth/logout-sales-rep", {
          headers: {
            Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
        })
        .json<{
          status_code: "OK";
        }>(),
    onSuccess: async () => {
      queryClient.invalidateQueries();

      await revalidateSiteLayout("/");
    },
  });
};

export default useOSRLogoutMutation;
