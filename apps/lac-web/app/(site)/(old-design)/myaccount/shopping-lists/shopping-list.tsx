"use client";

import {
  ProductsGridDesktopContainer,
  ProductsGridListSkeleton,
  ProductsGridPaginationSkeleton,
} from "@/_components/products-grid";
import useSuspenseShoppingList from "@/_hooks/shopping-list/use-suspense-shopping-list.hook";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/old/myaccount/shopping-lists/tabs";
import { Button } from "@repo/web-ui/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { ShoppingListHeaderSkeleton } from "./layouts";
import ShoppingListDialog from "./shopping-list-dialog";
import {
  ShoppingListEmptyItems,
  ShoppingListItems,
} from "./shopping-list-items";

const ShoppingList = ({ token }: { readonly token: string }) => {
  const [selectedAddressShoppingListId, setSelectedAddressShoppingListId] =
    useState("");
  const [isOpenShoppingListDialog, setIsOpenShoppingListDialog] =
    useState(false);

  const shoppingListsQuery = useSuspenseShoppingList(token, {
    sort: "name",
    sortDirection: "desc",
  });

  const shoppingLists = shoppingListsQuery?.data;

  const searchParams = useSearchParams();
  const shoppingListIdValue = searchParams.get("shoppingListId");

  const pageNoValue = searchParams.get("page") ?? "1";
  let page = !isNaN(parseInt(pageNoValue)) ? parseInt(pageNoValue) : 1;

  let shoppingList;

  if (shoppingListIdValue == selectedAddressShoppingListId) {
    // for selecting shopping list during pagination
    shoppingList = shoppingLists.lists.find(
      (list) => shoppingListIdValue == list?.listId,
    );
  } else if (selectedAddressShoppingListId) {
    // for selecting shopping list during tab selection
    page = 1;
    shoppingList = shoppingLists.lists.find(
      (list) => selectedAddressShoppingListId == list?.listId,
    );
  }

  if (!shoppingList && shoppingLists.lists.length > 0) {
    // for selecting the first shopping list when another shopping list is deleted
    shoppingList = shoppingLists.lists[0];
  }

  return (
    <>
      <div className="container flex flex-row justify-center md:px-0">
        {shoppingLists.lists.length > 0 && (
          <Tabs
            onValueChange={setSelectedAddressShoppingListId}
            value={shoppingList?.listId}
            defaultValue={shoppingLists.lists[0]?.listId}
            className="max-w-screen-md overflow-x-auto overflow-y-hidden"
          >
            <TabsList>
              {shoppingLists.lists.map((list) => (
                <TabsTrigger key={list.listId} value={list?.listId}>
                  {list?.listName}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
        <Button
          variant="ghost"
          className="mx-5 my-auto px-0 py-0 hover:bg-transparent"
          onClick={() => setIsOpenShoppingListDialog(true)}
        >
          <span className="sr-only">Create shopping list</span>
          <MdOutlineAdd
            className="border-1 size-6 rounded-sm border-gray-100 bg-transparent font-bold text-black shadow"
            data-button-action="Shopping List Create New List"
          />
        </Button>
      </div>

      <Suspense
        fallback={
          <>
            <ShoppingListHeaderSkeleton />

            <ProductsGridListSkeleton type="mobile" />

            <ProductsGridDesktopContainer>
              <ProductsGridListSkeleton type="desktop" />
            </ProductsGridDesktopContainer>

            <ProductsGridPaginationSkeleton />
          </>
        }
      >
        {shoppingList ? (
          <ShoppingListItems
            token={token}
            page={page}
            shoppingList={shoppingList}
          />
        ) : (
          <ShoppingListEmptyItems />
        )}
      </Suspense>

      <ShoppingListDialog
        open={isOpenShoppingListDialog}
        setOpenShoppingListDialog={setIsOpenShoppingListDialog}
        setSelectedAddressShoppingListId={setSelectedAddressShoppingListId}
        isShoppingListNameUpdate={false}
        shoppingList={{
          listId: "",
          listName: "",
          date: "",
          totalItem: "",
        }}
      />
    </>
  );
};

export default ShoppingList;
