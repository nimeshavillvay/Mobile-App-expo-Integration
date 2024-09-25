import { api } from "@/_lib/api";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation } from "@tanstack/react-query";

const usePasswordResetConfirmMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      userKey,
      userId,
      password,
    }: {
      userKey: string;
      userId: string;
      password: string;
    }) =>
      api
        .post("rest/register/password-reset-confirm", {
          json: {
            user_key: userKey,
            userid: userId,
            password,
          },
        })
        .json<{
          status_code: string;
        }>(),
    onSuccess: () => {
      toast({
        title: "Password has been changed successfully",
        description: "Please sign in",
      });
    },
  });
};

export default usePasswordResetConfirmMutation;
