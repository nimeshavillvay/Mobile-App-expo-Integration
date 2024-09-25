import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteOtherUserMutation = () => {
  const [cookies] = useCookies();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: number }) =>
      api
        .delete("rest/my-account/delete-user", {
          headers: {
            authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: { user_id: userId },
        })
        .json<{ status_code: string; message: string }>(),
    onMutate: () => {
      toast({ description: "Deleting user" });
    },
    onSuccess: (data) => {
      const transformedData = {
        statusCode: data.status_code,
        message: data.message,
      };

      if (transformedData.statusCode === "OK") {
        toast({
          description: "User deleted",
        });
      }
    },
    onError: async (error) => {
      const response = (await error?.response?.json()) as {
        status_code: string;
        message: string;
      };

      if (response?.status_code === "FAILED") {
        toast({
          description: response?.message,
          variant: "destructive",
        });
      } else {
        toast({
          description: "Failed to delete the user",
          variant: "destructive",
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "manage-users"],
      });
    },
  });
};

export default useDeleteOtherUserMutation;
