import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const userListSchema = z.object({
  userid: z.string(),
  account_type: z.string(),
  account_industry: z.string(),
  account_sales_category: z.string(),
});

const useGtmUser = () => {
  const [cookies] = useCookies();
  const token = cookies[SESSION_TOKEN_COOKIE];

  return useQuery({
    queryKey: ["gtm", "user", token],
    queryFn: async () => getGtmUser(token),
  });
};

export const getGtmUser = async (token: string) => {
  const response = await api
    .get("rest/gtm/user", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .json();

  return userListSchema.parse(response);
};

export default useGtmUser;
