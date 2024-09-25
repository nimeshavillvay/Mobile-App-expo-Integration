import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteCreditCardMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) =>
      api
        .delete("rest/my-account/creditcards", {
          headers: {
            Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: {
            card_id: id,
          },
        })
        .json(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "credit-cards"],
      });
    },
    onError: () => {
      toast({
        title: "Failed to remove card.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Successfully removed card.",
      });
    },
  });
};

export default useDeleteCreditCardMutation;
