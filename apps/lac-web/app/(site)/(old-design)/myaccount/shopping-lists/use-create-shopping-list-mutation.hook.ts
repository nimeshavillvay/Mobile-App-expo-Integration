import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useToast } from "@/old/_components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateShoppingListMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (listName: string) =>
      api
        .post("rest/my-favourite/lists/", {
          headers: {
            authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: {
            list: listName,
          },
        })
        .json<{ list_id: string }>(),
    onMutate: () => {
      toast({ description: "Creating shopping list" });
    },
    onSuccess: () => {
      toast({
        description: "Shopping list created",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to create shopping list",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-account", "shopping-list"],
      });
    },
  });
};

export default useCreateShoppingListMutation;
