"use client";

import AddToShoppingListDialog from "@/_components/add-to-shopping-list-dialog";
import useSuspenseFavoriteSKUs from "@/_hooks/shopping-list/use-suspense-favorite-skus.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { BookmarkFilled } from "@repo/web-ui/components/icons/bookmark-filled";
import { BookmarkOutline } from "@repo/web-ui/components/icons/bookmark-outline";
import { Button } from "@repo/web-ui/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FavoriteButtonProps = {
  readonly token?: string;
  readonly productId: number;
};

const FavoriteButton = ({ token, productId }: FavoriteButtonProps) => {
  const router = useRouter();

  const checkLoginQuery = useSuspenseCheckLogin(token);
  const isLoggedInUser = checkLoginQuery.data?.status_code === "OK";

  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);

  const { data: favoriteSKUs } = useSuspenseFavoriteSKUs(token, [
    productId.toString(),
  ]);

  const favoriteSKU = favoriteSKUs[0];
  const isFavorite = favoriteSKU?.isFavorite ?? false;

  return (
    <>
      <Button
        variant="outline"
        size="icon"
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
            data-button-action="Open Wishlist"
          />
        ) : (
          <BookmarkOutline
            className="size-4"
            data-button-action={
              isLoggedInUser
                ? "Add to Shopping List Logged in"
                : "Add to Shopping List Logged out"
            }
          />
        )}

        <span className="sr-only">Add to list</span>
      </Button>

      <AddToShoppingListDialog
        open={showShoppingListsDialog}
        setOpenAddToShoppingListDialog={setShowShoppingListsDialog}
        productId={productId}
        favoriteListIds={favoriteSKU?.favoriteListIds ?? []}
        token={token}
      />
    </>
  );
};

export default FavoriteButton;
