"use client";

import useAddToCartDialog from "@/_hooks/misc/use-add-to-cart-dialog.hook";
import { Button } from "@/old/_components/ui/button";

type BuyAgainButtonProps = {
  readonly productId: number;
  readonly disabled?: boolean;
};

const BuyAgainButton = ({ productId, ...delegated }: BuyAgainButtonProps) => {
  const { setOpen, setProductId } = useAddToCartDialog(
    (state) => state.actions,
  );

  const addToCart = () => {
    setProductId(productId);
    setOpen("verification");
  };

  return (
    <Button
      className="h-12 w-[170px] text-base md:h-9"
      onClick={() => addToCart()}
      {...delegated}
      data-button-action="Order History Buy Again"
    >
      Buy Again
    </Button>
  );
};

export default BuyAgainButton;
