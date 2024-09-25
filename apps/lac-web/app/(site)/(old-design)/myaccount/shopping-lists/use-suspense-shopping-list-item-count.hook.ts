import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseShoppingListItemCount = (
  token: string,
  shoppingListId: string,
) => {
  return useSuspenseQuery({
    queryKey: ["my-account", "shopping-list", token, shoppingListId],
    queryFn: () =>
      api
        .get("rest/my-favourite/total-count/" + shoppingListId, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .json<{ count: number }>(),
  });
};

export default useSuspenseShoppingListItemCount;
