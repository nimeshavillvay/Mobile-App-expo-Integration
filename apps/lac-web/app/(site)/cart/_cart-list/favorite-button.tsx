"use client";

import AddToShoppingListDialog from "@/_components/add-to-shopping-list-dialog";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { BookmarkFilled } from "@repo/web-ui/components/icons/bookmark-filled";
import { BookmarkOutline } from "@repo/web-ui/components/icons/bookmark-outline";
import { Button } from "@repo/web-ui/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FavoriteButtonProps = {
  readonly token: string;
  readonly productId: number;
  readonly display: "mobile" | "desktop";
  readonly isFavorite?: boolean;
  readonly favoriteListIds?: string[];
};

const FavoriteButton = ({
  token,
  productId,
  display,
  isFavorite = false,
  favoriteListIds = [],
}: FavoriteButtonProps) => {
  const router = useRouter();

  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);

  const checkLoginQuery = useSuspenseCheckLogin(token);
  const isLoggedInUser = checkLoginQuery.data?.status_code === "OK";

  return (
    <>
      {display === "desktop" && (
        <Button
          variant="ghost"
          className="h-fit w-full justify-end px-0 py-0"
          onClick={() => {
            if (isLoggedInUser) {
              setShowShoppingListsDialog(true);
            } else {
              router.push("/sign-in");
            }
          }}
        >
          <span
            className="text-[13px] leading-5"
            data-button-action="Cart Logged Out Open Add to Shopping List Dialog"
          >
            Add to List
          </span>

          {isFavorite ? (
            <BookmarkFilled
              className="size-4"
              data-button-action="Cart Open Add to Shopping List Dialog"
            />
          ) : (
            <BookmarkOutline
              className="size-4"
              data-button-action={
                isLoggedInUser
                  ? "Cart Open Add to Shopping List Dialog"
                  : "Cart Logged Out Open Add to Shopping List Dialog"
              }
            />
          )}
        </Button>
      )}

      {display === "mobile" && (
        <Button
          variant="subtle"
          className="w-full"
          onClick={() => {
            if (isLoggedInUser) {
              setShowShoppingListsDialog(true);
            } else {
              router.push("/sign-in");
            }
          }}
        >
          {isFavorite ? (
            <BookmarkFilled
              className="size-4"
              data-button-action="Cart Mobile Open Add to Shopping List Dialog"
            />
          ) : (
            <BookmarkOutline
              className="size-4"
              data-button-action={
                isLoggedInUser
                  ? "Cart Mobile Open Add to Shopping List Dialog"
                  : "Cart Logged Out Mobile Open Add to Shopping List Dialog"
              }
            />
          )}

          <span className="sr-only">Add to list</span>
        </Button>
      )}

      <AddToShoppingListDialog
        open={showShoppingListsDialog}
        setOpenAddToShoppingListDialog={setShowShoppingListsDialog}
        productId={productId}
        favoriteListIds={favoriteListIds}
        token={token}
      />
    </>
  );
};

export default FavoriteButton;
