"use client";

import FullAddress from "@/_components/full-address";
import useSuspenseShippingAddressList from "@/_hooks/address/use-suspense-shipping-address-list.hook";
import useUpdateShippingAddressMutation from "@/_hooks/address/use-update-shipping-address-mutation.hook";
import useSuspenseIsAdminOrOsr from "@/_hooks/user/use-suspense-is-admin-or-osr.hook";
import type { Country, Token } from "@/_lib/types";
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
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import AddShippingAddressDialog from "./add-shipping-address-dialog";

type ShippingAddressSelectorProps = {
  readonly token: Token;
  readonly children: ReactNode;
  readonly countries: Country[];
};

const ShippingAddressSelector = ({
  token,
  children,
  countries,
}: ShippingAddressSelectorProps) => {
  const shippingAddressListQuery = useSuspenseShippingAddressList(token);
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const defaultAddress = shippingAddressListQuery.data.find(
    (address) => address.default,
  );

  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(
    defaultAddress?.xcAddressId ?? "",
  );

  const pathname = usePathname();
  const router = useRouter();

  const [openNewAddressDialog, setOpenNewAddressDialog] = useState(false);

  const updateShippingAddressMutation = useUpdateShippingAddressMutation();

  const changeDefaultAddress = () => {
    const address = shippingAddressListQuery.data.find(
      (address) => address.xcAddressId === selectedAddress,
    );

    if (address) {
      updateShippingAddressMutation.mutate(
        {
          shipTo: address.shipTo,
          default: true,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["cart"],
            });
            shippingAddressListQuery.refetch();
            setOpen(false);
            toast({
              title: "Changed selected address",
            });
            if (pathname === "/checkout") {
              router.replace("/cart");
            }
          },
        },
      );
    }
  };

  const isAdminOrOsr = useSuspenseIsAdminOrOsr(token);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent className="max-w-[34.375rem]">
          <DialogHeader>
            <DialogTitle>Change Shipping Address</DialogTitle>
          </DialogHeader>

          <ul className="flex max-h-[60vh] flex-col gap-4 overflow-y-scroll">
            {shippingAddressListQuery.data.map((address) => (
              <li key={address.xcAddressId}>
                <Button
                  variant="outline"
                  className={cn(
                    "flex h-fit w-full flex-row justify-start gap-2 rounded-lg border-2 border-wurth-gray-150 px-4 py-4",
                    address.xcAddressId === selectedAddress && "border-black",
                  )}
                  onClick={() => setSelectedAddress(address.xcAddressId ?? "")}
                  disabled={updateShippingAddressMutation.isPending}
                >
                  <span>
                    {address.xcAddressId === selectedAddress ? (
                      <CheckCircleFilled
                        width={20}
                        height={20}
                        className="fill-black"
                      />
                    ) : (
                      <CheckCircle
                        width={20}
                        height={20}
                        className="stroke-wurth-gray-150"
                        data-button-action="Select Different Shipping Address"
                      />
                    )}
                  </span>

                  <span className="text-wrap text-start text-sm text-wurth-gray-800 md:text-base">
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
                className="font-bold"
                onClick={() => {
                  setOpen(false);
                  setOpenNewAddressDialog(true);
                }}
                disabled={updateShippingAddressMutation.isPending}
                data-button-action="Open Add New Shipping Address"
              >
                Add new address
              </Button>
            )}

            <Button
              className="font-bold"
              onClick={changeDefaultAddress}
              disabled={updateShippingAddressMutation.isPending}
              data-button-action="Update Shipping Address"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AddShippingAddressDialog
        open={openNewAddressDialog}
        closeDialog={() => {
          setOpen(true);
          setOpenNewAddressDialog(false);
        }}
        countries={countries}
      />
    </>
  );
};

export default ShippingAddressSelector;
