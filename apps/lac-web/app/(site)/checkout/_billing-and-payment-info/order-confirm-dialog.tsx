"use client";

import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";
import { useState } from "react";
import useCheckoutMutation from "./use-checkout-mutation.hook";

type OrderConfirmDialogProps = {
  readonly token: string;
  readonly paymentMethodSelected: boolean;
};

const OrderConfirmDialog = ({
  token,
  paymentMethodSelected,
}: OrderConfirmDialogProps) => {
  const [open, setOpen] = useState(false);
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);

  const cartQuery = useSuspenseCart(token);

  const checkoutMutation = useCheckoutMutation();

  const clickConfirmOrder = async () => {
    // Check if a valid payment method is selected
    setConfirmClicked(true);
    try {
      await checkoutMutation.mutateAsync();
      setButtonDisable(true);
    } catch {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="lg"
          className="btn-proceed-to-checkout h-fit rounded-lg px-20 py-4 text-lg font-normal shadow-md md:max-w-60 md:self-end"
          disabled={cartQuery.data.allRegionalExluded || !paymentMethodSelected}
          data-button-action="Checkout Open Place Your Order Dialog"
        >
          Place your Order
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {confirmClicked ? "Please wait" : "Confirm Your Order"}
          </DialogTitle>

          <DialogDescription>
            {confirmClicked
              ? "Order is processing"
              : "Upon confirmation, your order will be placed."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            disabled={checkoutMutation.isPending || buttonDisable}
            onClick={() => setOpen(false)}
            data-button-action="Checkout Cancel Place Your Order"
          >
            Cancel
          </Button>
          <Button
            onClick={() => clickConfirmOrder()}
            disabled={checkoutMutation.isPending || buttonDisable}
            data-button-action="Checkout Confirm Place Your Order"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmDialog;
