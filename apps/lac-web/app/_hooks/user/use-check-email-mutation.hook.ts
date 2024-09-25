import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useMutation } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const useCheckEmailMutation = () => {
  const [cookies] = useCookies();

  return useMutation({
    mutationFn: async (email: string) => {
      const response = await api
        .post("rest/register/check-email", {
          headers: {
            Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: { email },
        })
        .json<{ status_code: "USER_NEW" }>();

      return {
        statusCode: response.status_code,
      };
    },
  });
};

export default useCheckEmailMutation;
