import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import type { UpdateUser } from "@/_lib/types";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateProfileMutation = () => {
  const [cookies] = useCookies();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      firstName,
      lastName,
      jobTitle,
      email,
      password,
      permission,
      status,
    }: UpdateUser) =>
      api
        .post("rest/my-account/update_profile", {
          headers: {
            authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: {
            user_id: userId,
            first_name: firstName,
            last_name: lastName,
            job_title: jobTitle,
            email,
            password,
            permission,
            status,
          },
        })
        .json<{
          status_code: string;
          message: string;
        }>(),
    onMutate: () => {
      toast({ description: "Updating user profile" });
    },
    onSuccess: (data) => {
      const transformedData = {
        statusCode: data.status_code,
        message: data.message,
      };

      if (transformedData.statusCode === "OK") {
        toast({
          description: "User profile has been successfully updated.",
        });
      }
    },
    onError: () => {
      toast({
        description: "Failed to update the user profile",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export default useUpdateProfileMutation;
