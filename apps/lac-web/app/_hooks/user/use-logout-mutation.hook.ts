import { revalidateSiteLayout } from "@/_actions/revalidate";
import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const PRIVATE_ROUTES = ["/checkout", "/myaccount"];

const useLogoutMutation = () => {
  const pathname = usePathname();

  const [cookies] = useCookies();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      api
        .get("rest/auth/logout", {
          headers: {
            Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
        })
        .json<{
          status_code: "OK";
        }>(),
    onSuccess: async () => {
      queryClient.invalidateQueries();

      let inPrivateRoute = false;
      PRIVATE_ROUTES.forEach((privateRoute) => {
        if (pathname.startsWith(privateRoute)) {
          inPrivateRoute = true;
        }
      });

      await revalidateSiteLayout(inPrivateRoute ? "/sign-in" : undefined);
    },
  });
};

export default useLogoutMutation;
