import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation } from "@tanstack/react-query";

const useDeleteShippingAddressMutation = () => {
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (shipToId: number) =>
      api
        .delete("rest/my-account/shipping-address", {
          headers: {
            authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: {
            "ship-to": shipToId,
          },
        })
        .json(),
    onMutate: () => {
      toast({ description: "Requesting to delete the shipping address" });
    },
    onSuccess: () => {
      toast({
        description: "Delete Request Sent",
      });
    },
    onError: () => {
      toast({
        description: "Failed to request deleting the shipping address",
        variant: "destructive",
      });
    },
  });
};

export default useDeleteShippingAddressMutation;
