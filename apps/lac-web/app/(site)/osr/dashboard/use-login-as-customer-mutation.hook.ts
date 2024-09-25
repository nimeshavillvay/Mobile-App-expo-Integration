import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { toast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLoginAsCustomerMutation = () => {
  const [cookies] = useCookies();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      return await api
        .post("rest/auth/login-customer", {
          headers: {
            authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: {
            user_id: userId,
          },
        })
        .json<{
          status_code: string;
          user_id: number;
          sales_rep_id: string;
        }>();
    },
    onSuccess: () => {
      toast({
        description: "Successfully login as customer",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        description: "Failed to login as customer",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries();
      queryClient.resetQueries({ queryKey: ["user", "price-check"] });
    },
  });
};

export default useLoginAsCustomerMutation;
