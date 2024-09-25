import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddCreditCardMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      token,
      expDate,
      holderName,
      type,
      defaultCard,
      save,
    }: {
      token: string;
      expDate: string;
      holderName: string;
      type: string;
      defaultCard: boolean;
      save: boolean;
    }) =>
      api
        .post("rest/my-account/creditcards", {
          headers: {
            Authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },

          json: {
            token,
            expdate: expDate,
            holdername: holderName,
            card_type: type,
            default: defaultCard ? "Y" : "",
            save,
          },
        })
        .json<{
          card_id: number;
        }>(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "credit-cards"],
      });
    },
    onError: () => {
      toast({
        title: "Error adding new card.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Successfully added new card.",
      });
    },
  });
};

export default useAddCreditCardMutation;
