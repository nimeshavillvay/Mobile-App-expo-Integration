import { api } from "@/_lib/api";
import { ACCOUNT_TOKEN_COOKIE } from "@/old/_lib/constants";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCookies from "../storage/use-cookies.hook";

const PASSWORD_RESET_ACTIVE_MSG =
  "Password reset email has been successfully sent to user.";
const PASSWORD_RESET_INACTIVE_MSG =
  "This User is currently flagged as inactive in the system. please contact web support at websupport@wurthlac.com, or call 800-422-4389 x1014.";

type Status = "PENDING" | "ACTIVE" | "DEACTIVE" | "INACTIVE" | "DISABLED";

type ForgetPasswordResponse = {
  data: { status: Status };
  message: string | null;
  isSuccess: boolean;
};

const useForgetPasswordMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  const handleToast = (status: Status) => {
    if (status === "ACTIVE") {
      toast({
        description: PASSWORD_RESET_ACTIVE_MSG,
      });
    }
    if (status === "INACTIVE") {
      toast({
        description: PASSWORD_RESET_INACTIVE_MSG,
      });
    }
  };

  return useMutation({
    mutationFn: ({ email }: { email: string }) => {
      return api
        .post("rest/register/password-reset", {
          headers: {
            authorization: `Bearer ${cookies[ACCOUNT_TOKEN_COOKIE]}`,
          },
          json: { email },
        })
        .json<ForgetPasswordResponse>();
    },
    onMutate: () => {
      toast({ description: "Resetting user password" });
    },
    onSuccess: (data) => {
      if (data?.isSuccess && data?.data?.status) {
        handleToast(data?.data?.status);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "manage-users"],
      });
    },
  });
};

export default useForgetPasswordMutation;
