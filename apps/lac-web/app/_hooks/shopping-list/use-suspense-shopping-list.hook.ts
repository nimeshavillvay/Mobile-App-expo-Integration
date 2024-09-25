import { api } from "@/_lib/api";
import type {
  Pagination,
  ShoppingList,
  ShoppingListElement,
  ShoppingListElementResponse,
  ShoppingListResponse,
} from "@/_lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const useSuspenseShoppingList = (
  token: string | undefined,
  { sort, sortDirection }: { sort: string; sortDirection: string },
) => {
  return useSuspenseQuery({
    queryKey: ["my-account", "shopping-list", token, sort, sortDirection],
    queryFn: () =>
      api
        .get("rest/my-favourite/lists", {
          headers: {
            Authorization: token ? `Bearer ${token}` : token,
          },
          searchParams: {
            sort: sort,
            sort_direction: sortDirection,
          },
        })
        .json<ShoppingListResponse>(),
    select: (data): ShoppingList => {
      const { lists, pagination } = data;

      const shoppingLists = lists.map(
        (list: ShoppingListElementResponse): ShoppingListElement => ({
          listId: list.list_id,
          listName: list.list,
          date: list.date,
          totalItem: list.totalItem,
        }),
      );

      const shoppingListPagination: Pagination = {
        totalCount: Number(pagination.db_count),
        offset: pagination.offset,
        perPage: pagination.perPage,
      };

      return { lists: shoppingLists, pagination: shoppingListPagination };
    },
  });
};

export default useSuspenseShoppingList;
