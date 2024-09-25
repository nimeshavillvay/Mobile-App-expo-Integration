"use client";

import AddToShoppingListDialog from "@/_components/add-to-shopping-list-dialog";
import { BookmarkFilled } from "@repo/web-ui/components/icons/bookmark-filled";
import { BookmarkOutline } from "@repo/web-ui/components/icons/bookmark-outline";
import { Button } from "@repo/web-ui/components/ui/button";
import { useState } from "react";

type FavoriteButtonProps = {
  readonly token: string;
  readonly productId: number;
  readonly isFavorite?: boolean;
  readonly favoriteListIds?: string[];
};

const FavoriteButton = ({
  token,
  productId,
  isFavorite = false,
  favoriteListIds = [],
}: FavoriteButtonProps) => {
  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setShowShoppingListsDialog(true)}
      >
        {isFavorite ? (
          <BookmarkFilled
            className="fill-black text-2xl text-brand-primary"
            data-button-action="Purchase Items Open Add to Wishlist Dialog"
          />
        ) : (
          <BookmarkOutline
            className="text-2xl text-brand-gray-500"
            data-button-action="Purchase Items Open Add to Wishlist Dialog"
          />
        )}
      </Button>

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
