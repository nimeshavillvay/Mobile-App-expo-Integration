import AddShippingAddressDialog from "@/_components/add-shipping-address-dialog";
import FullAddress from "@/_components/full-address";
import useSuspenseShippingAddressList from "@/_hooks/address/use-suspense-shipping-address-list.hook";
import useSuspenseCart from "@/_hooks/cart/use-suspense-cart.hook";
import useUpdateCartConfigMutation from "@/_hooks/cart/use-update-cart-config-mutation.hook";
import useSuspenseIsAdminOrOsr from "@/_hooks/user/use-suspense-is-admin-or-osr.hook";
import type { Country } from "@/_lib/types";
import { cn } from "@/_lib/utils";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { CheckCircleFilled } from "@repo/web-ui/components/icons/check-circle-filled";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";
import { useToast } from "@repo/web-ui/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SelectAddressDialogProps = {
  readonly token: string;
  readonly countries: Country[];
};

const SelectAddressDialog = ({
  token,
  countries,
}: SelectAddressDialogProps) => {
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const shippingAddressListQuery = useSuspenseShippingAddressList(token);
  const cartQuery = useSuspenseCart(token);

  const [addressId, setAddressId] = useState(
    cartQuery.data.configuration.shippingAddressId ?? "",
  );

  const queryClient = useQueryClient();

  const updateCartConfigMutation = useUpdateCartConfigMutation();

  const handleConfirm = async () => {
    try {
      await updateCartConfigMutation.mutateAsync({
        shippingAddressId: addressId,
      });

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-account", "shipping-addresses"],
      });
      toast({
        title: "Address selected",
        description:
          "Change in shipping address may affect cart item availability, please review and proceed to checkout",
      });
      setOpen(false);
      router.replace("/cart");
    } catch {
      setOpen(false);
    }
  };

  const isAdminOrOsr = useSuspenseIsAdminOrOsr(token);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="max-w-fit font-bold shadow-md"
            data-button-action="Checkout Open Change Address Dialog"
          >
            Change Address
          </Button>
        </DialogTrigger>

        <DialogContent className="flex max-h-dvh max-w-[34.375rem] flex-col">
          <DialogHeader>
            <DialogTitle>Change Shipping Address</DialogTitle>
          </DialogHeader>

          <ul className="flex flex-1 flex-col gap-4 overflow-y-auto">
            {shippingAddressListQuery.data.map((address) => (
              <li key={address.xcAddressId}>
                <Button
                  variant="outline"
                  className={cn(
                    "h-fit w-full justify-start rounded-lg border-2 border-wurth-gray-150 px-4 py-4",
                    address.xcAddressId === addressId && "border-black",
                  )}
                  onClick={() => {
                    if (address.xcAddressId) {
                      setAddressId(address.xcAddressId);
                    }
                  }}
                >
                  {address.xcAddressId === addressId ? (
                    <CheckCircleFilled
                      width={20}
                      height={20}
                      className="shrink-0 fill-black"
                    />
                  ) : (
                    <CheckCircle
                      width={20}
                      height={20}
                      className="shrink-0 stroke-wurth-gray-150"
                      data-button-action="Checkout Select Change Address"
                    />
                  )}

                  <span
                    className="flex-1 text-wrap text-left text-base text-wurth-gray-800"
                    data-button-action="Checkout Select Change Address"
                  >
                    <FullAddress address={address} />
                  </span>
                </Button>
              </li>
            ))}
          </ul>

          <DialogFooter>
            {isAdminOrOsr && (
              <Button
                variant="outline"
                className="font-bold shadow-md"
                onClick={() => {
                  setOpenAdd(true);
                  setOpen(false);
                }}
                data-button-action="Checkout Admin or osr Add New Address"
              >
                Add new address
              </Button>
            )}

            <Button
              className="font-bold shadow-md"
              onClick={handleConfirm}
              disabled={updateCartConfigMutation.isPending}
              data-button-action="Checkout Confirm Change Address"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AddShippingAddressDialog
        open={openAdd}
        closeDialog={() => {
          setOpenAdd(false);
          setOpen(true);
        }}
        countries={countries}
      />
    </>
  );
};

export default SelectAddressDialog;
