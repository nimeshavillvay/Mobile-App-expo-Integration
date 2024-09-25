import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useToast } from "@/old/_components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateCompanyProfileImageMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (profileImageFormData: FormData) =>
      api.post("rest/osrdetails", {
        headers: {
          authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
        },
        body: profileImageFormData,
      }),
    onMutate: () => {
      toast({ description: "Updating billing address" });
    },
    onSuccess: () => {
      toast({
        description: "Billing address updated",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to update the billing address",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-account", "company-profile"],
      });
    },
  });
};

export default useUpdateCompanyProfileImageMutation;
