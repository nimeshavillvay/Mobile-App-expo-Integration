import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useToast } from "@/old/_components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteShoppingListMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (listId: string) =>
      api
        .delete("rest/my-favourite/lists/", {
          headers: {
            authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: {
            list_id: listId,
          },
        })
        .json(),
    onMutate: () => {
      toast({ description: "Deleting shopping list" });
    },
    onSuccess: () => {
      toast({
        description: "Shopping list deleted",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to delete shopping list",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "favorite-skus"],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-account", "shopping-list"],
      });
    },
  });
};

export default useDeleteShoppingListMutation;
