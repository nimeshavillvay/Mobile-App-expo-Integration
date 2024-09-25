"use client";

import {
  ProductsGridDesktopContainer,
  ProductsGridListSkeleton,
  ProductsGridPaginationSkeleton,
} from "@/_components/products-grid";
import useGtmProducts from "@/_hooks/gtm/use-gtm-item-info.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import type { ShoppingListElement } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { Button } from "@repo/web-ui/components/ui/button";
import { Suspense, useState, type ComponentProps, type ReactNode } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { PiPenNibDuotone } from "react-icons/pi";
import ActionConfirmationDialog from "./action-confirmation-dialog";
import ProductCard from "./product-card";
import ShoppingListDialog from "./shopping-list-dialog";
import ShoppingListPagination from "./shopping-list-pagination";
import type { ShoppingListItems, ShoppingListItemsElement } from "./type";
import useDeleteShoppingListMutation from "./use-delete-shopping-list-mutation.hook";
import useSuspenseShoppingListItemCount from "./use-suspense-shopping-list-item-count.hook";
import useSuspenseShoppingListItems from "./use-suspense-shopping-list-item.hook";

const ProductsGridListContainer = ({
  type,
  children,
}: {
  readonly type: "mobile" | "desktop";
  readonly children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        type === "mobile"
          ? "flex flex-col gap-3 md:hidden"
          : "grid flex-1 gap-5 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5",
      )}
    >
      {children}
    </div>
  );
};

const ShoppingListItems = ({
  token,
  page,
  shoppingList,
}: {
  readonly token: string;
  readonly page: number;
  readonly shoppingList: ShoppingListElement;
}) => {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenShoppingListDialog, setIsOpenShoppingListDialog] =
    useState(false);

  const perPage = 20;

  const shoppingListItemCountQuery = useSuspenseShoppingListItemCount(
    token,
    shoppingList.listId,
  );
  const shoppingListItemCount = shoppingListItemCountQuery?.data;
  const totalPages = Math.ceil(shoppingListItemCount.count / perPage);

  const shoppingListItemsQuery = useSuspenseShoppingListItems(
    token,
    shoppingList.listId,
    page,
    perPage,
    "title",
    "desc",
  );

  const shoppingListItems = shoppingListItemsQuery?.data;

  const deleteShoppingListMutation = useDeleteShoppingListMutation();

  const renameShoppingList = () => {
    setIsOpenShoppingListDialog(true);
  };

  const deleteShoppingList = () => {
    setIsOpenDeleteDialog(true);
  };

  return (
    <>
      <div className="container my-5 flex flex-col items-center justify-between md:flex-row md:px-0">
        <h3 className="font-title text-2xl font-bold">
          {shoppingList.listName}
        </h3>
        <div className="flex flex-row items-center gap-2">
          <ShoppingListButtons
            renameShoppingList={renameShoppingList}
            deleteShoppingList={deleteShoppingList}
          />
        </div>
      </div>

      <div className="container md:px-0">
        <div className="my-5 flex flex-row items-center justify-between text-sm font-normal">
          <div className="font-title text-lg font-medium tracking-normal md:text-3xl md:tracking-[-0.01406rem]">
            {shoppingListItemCount.count} items
          </div>
          <div className="text-sm font-normal md:text-base">
            Page {page} of {totalPages == 0 ? 1 : totalPages}
          </div>
        </div>

        <Suspense fallback={<ProductsGridListSkeleton type="mobile" />}>
          {shoppingListItems.items.length > 0 && (
            <ProductCardsList
              type="mobile"
              shoppingListItems={shoppingListItems.items}
              token={token}
              listId={shoppingList.listId}
            />
          )}
        </Suspense>

        <ProductsGridDesktopContainer>
          <Suspense fallback={<ProductsGridListSkeleton type="desktop" />}>
            {shoppingListItems.items.length > 0 && (
              <ProductCardsList
                type="desktop"
                shoppingListItems={shoppingListItems.items}
                token={token}
                listId={shoppingList.listId}
                stretchWidth
              />
            )}
          </Suspense>
        </ProductsGridDesktopContainer>

        <Suspense fallback={<ProductsGridPaginationSkeleton />}>
          {!!shoppingList?.listId && (
            <ShoppingListPagination
              page={page}
              totalPages={totalPages}
              shoppingListId={shoppingList?.listId}
            />
          )}
        </Suspense>
      </div>

      <ShoppingListDialog
        open={isOpenShoppingListDialog}
        setOpenShoppingListDialog={setIsOpenShoppingListDialog}
        isShoppingListNameUpdate={true}
        shoppingList={shoppingList}
      />

      <ActionConfirmationDialog
        open={isOpenDeleteDialog}
        onOpenChange={setIsOpenDeleteDialog}
        title="Confirm Action"
        text="Do you really want to delete this shopping list?"
        onConfirm={() => {
          deleteShoppingListMutation.mutate(shoppingList.listId);
          setIsOpenDeleteDialog(false);
        }}
        okText="Confirm"
      />
    </>
  );
};

const ProductCardsList = ({
  type,
  shoppingListItems,
  token,
  listId,
  stretchWidth,
}: {
  readonly type: ComponentProps<typeof ProductsGridListContainer>["type"];
  readonly shoppingListItems: ShoppingListItemsElement[];
  readonly token: string;
  readonly listId: string;
  readonly stretchWidth?: ComponentProps<typeof ProductCard>["stretchWidth"];
}) => {
  const priceCheckQuery = useSuspensePriceCheck(
    token,
    shoppingListItems.map((product) => ({
      productId: Number(product.productId),
      qty: 1,
    })),
  );

  const gtmProducts = shoppingListItems.map((product) => {
    return {
      productid: Number(product.productId),
      cartid: 0,
      quantity: 1,
    };
  });
  const gtmItemInfoQuery = useGtmProducts(gtmProducts);
  const gtmItemInfo = gtmItemInfoQuery.data;

  return (
    <ProductsGridListContainer type={type}>
      {shoppingListItems.map((item) => {
        const priceData = priceCheckQuery.data.productPrices.find(
          (price) => Number(price.productId) === Number(item.productId),
        );

        if (!priceData) {
          return null;
        }

        return (
          <ProductCard
            key={item.productId}
            orientation={type === "mobile" ? "horizontal" : "vertical"}
            product={item}
            listId={listId}
            stretchWidth={stretchWidth}
            priceData={{
              listPrice: priceData.listPrice,
              price: priceData.price,
              uomPrice: priceData.uomPrice,
              uomPriceUnit: priceData.uomPriceUnit,
            }}
            gtmItemInfo={gtmItemInfo?.[0]}
            token={token}
          />
        );
      })}
    </ProductsGridListContainer>
  );
};

const ShoppingListButtons = ({
  renameShoppingList,
  deleteShoppingList,
  disabled = false,
}: {
  readonly renameShoppingList?: () => void;
  readonly deleteShoppingList?: () => void;
  readonly disabled?: boolean;
}) => {
  return (
    <>
      <Button
        variant="outline"
        className="rounded-lg border-gray-100 bg-transparent py-5 text-sm font-bold tracking-wide text-black shadow hover:border-gray-300"
        aria-label="Rename shopping list"
        onClick={renameShoppingList}
        disabled={disabled}
        data-button-action="Shopping List Open Rename List Name Dialog"
      >
        <PiPenNibDuotone
          className="size-4"
          data-button-action="Shopping List Open Rename List Name Dialog"
        />
        <span className="sr-only">Rename shopping list</span>
        Rename list
      </Button>
      <Button
        variant="outline"
        className="rounded-lg border-gray-100 bg-transparent py-5 text-sm font-bold tracking-wide text-brand-primary shadow hover:border-gray-300"
        aria-label="Delete shopping list"
        onClick={deleteShoppingList}
        disabled={disabled}
        data-button-action="Shopping List Open Delete List Name Dialog"
      >
        <MdOutlineDelete
          className="size-4"
          data-button-action="Shopping List Open Delete List Name Dialog"
        />
        <span className="sr-only">Delete shopping list</span>
        Delete list
      </Button>
    </>
  );
};

const ShoppingListEmptyItems = () => {
  return (
    <>
      <div className="flex justify-end gap-2">
        <ShoppingListButtons disabled={true} />
      </div>
      <p className="mt-10 text-center text-xl font-bold">No items found</p>
    </>
  );
};

export { ShoppingListEmptyItems, ShoppingListItems };
