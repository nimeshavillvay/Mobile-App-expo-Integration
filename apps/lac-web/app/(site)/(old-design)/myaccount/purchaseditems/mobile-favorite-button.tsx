"use client";

import AddToShoppingListDialog from "@/_components/add-to-shopping-list-dialog";
import { cn } from "@/_lib/utils";
import AddToFavoritesIcon from "@/old/_components/icons/add-to-favorites";
import FavoriteIcon from "@/old/_components/icons/favorite";
import { Button } from "@repo/web-ui/components/ui/button";
import { useState } from "react";

type FavoriteButtonProps = {
  readonly token: string;
  readonly productId: number;
  readonly isFavorite?: boolean;
  readonly favoriteListIds?: string[];
};

const MobileFavoriteButton = ({
  token,
  productId,
  isFavorite = false,
  favoriteListIds = [],
}: FavoriteButtonProps) => {
  const [showShoppingListsDialog, setShowShoppingListsDialog] = useState(false);

  return (
    <>
      <Button
        className={cn(
          "h-12 uppercase",
          isFavorite
            ? "border-2 border-[#55a213] bg-white text-[#55a213] hover:bg-white"
            : "border-2 border-sky-500 bg-white text-brand-secondary hover:bg-white",
        )}
        onClick={() => setShowShoppingListsDialog(true)}
      >
        {isFavorite ? (
          <>
            <FavoriteIcon
              className="text-2xl"
              data-button-action="Purchase Items Open Add to Wishlist"
            />
            added to list
          </>
        ) : (
          <>
            <AddToFavoritesIcon
              className="pt-1 text-2xl"
              data-button-action="Purchase Items Open Add to Wishlist"
            />
            add to list
          </>
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

export default MobileFavoriteButton;
