import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { isErrorResponse } from "@/_lib/utils";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddUserDataMutation = () => {
  const [cookies] = useCookies();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      firstName,
      lastName,
      jobTitle,
      email,
      password,
      permission,
      forcePasswordReset,
    }: {
      firstName: string;
      lastName: string;
      jobTitle: string;
      email: string;
      password: string;
      permission: string;
      forcePasswordReset: boolean;
    }) =>
      api
        .post("rest/my-account/create-user", {
          headers: {
            authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: {
            first_name: firstName,
            last_name: lastName,
            job_title: jobTitle,
            email,
            password,
            permission,
            change_password: forcePasswordReset,
          },
        })
        .json<{ status_code: string; message: string; user_id: number }>(),
    onSuccess: (data) => {
      const transformedData = {
        statusCode: data.status_code,
        message: data.message,
        userId: data.user_id,
      };

      if (transformedData.statusCode === "OK") {
        toast({
          description: "New user successfully added.",
        });
      }
    },
    onError: async (error) => {
      if (error?.response?.status === 400) {
        const errorResponse = await error.response.json();

        if (
          isErrorResponse(errorResponse) &&
          errorResponse["status_code"] === "FAILED" &&
          errorResponse.message
        ) {
          toast({
            description: errorResponse.message,
            variant: "destructive",
          });
        } else {
          toast({
            description: "New user creation failed.",
            variant: "destructive",
          });
        }
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "manage-users"],
      });
    },
  });
};

export default useAddUserDataMutation;
