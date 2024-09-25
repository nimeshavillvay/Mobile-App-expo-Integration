import useCookies from "@/_hooks/storage/use-cookies.hook";
import { api } from "@/_lib/api";
import { SESSION_TOKEN_COOKIE } from "@/_lib/constants";
import { useToast } from "@/old/_components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateShoppingListMutation = () => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ listId, listName }: { listId: string; listName: string }) =>
      api
        .put("rest/my-favourite/lists/", {
          headers: {
            authorization: `Bearer ${cookies[SESSION_TOKEN_COOKIE]}`,
          },
          json: {
            list: listName,
            list_id: listId,
          },
        })
        .json(),
    onMutate: () => {
      toast({ description: "Updating shopping list" });
    },
    onSuccess: () => {
      toast({
        description: "Shopping list updated",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        description: "Failed to update shopping list",
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

export default useUpdateShoppingListMutation;
