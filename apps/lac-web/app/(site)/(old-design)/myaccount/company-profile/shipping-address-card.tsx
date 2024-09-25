import useUpdateShippingAddressMutation from "@/_hooks/address/use-update-shipping-address-mutation.hook";
import type { Address, AddressFormData } from "@/_lib/types";
import { Button } from "@/old/_components/ui/button";
import { Button as NewButton } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";
import { useState } from "react";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import AddressDialog from "./address-dialog";
import AddressSuggestionDialog from "./address-suggestion-dialog";
import type { AddressCheckSuggestionsWithUuid } from "./types";
import useDeleteShippingAddressMutation from "./use-delete-shipping-address-mutation.hook";

const ShippingAddressCard = ({
  shippingAddress,
  soldTo,
  isAdminOrOsr,
}: {
  readonly shippingAddress: Address;
  readonly soldTo: string;
  readonly isAdminOrOsr: boolean;
}) => {
  const [openShippingAddressDialog, setOpenShippingAddressDialog] =
    useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] =
    useState(false);

  const [
    openShippingAddressSuggestionDialog,
    setOpenShippingAddressSuggestionDialog,
  ] = useState(false);

  const [address, setAddress] = useState<AddressFormData>();
  const [addressCheckSuggestions, setAddressCheckSuggestions] =
    useState<AddressCheckSuggestionsWithUuid>();

  const updateShippingAddressMutation = useUpdateShippingAddressMutation();

  const isSameAsBilling = soldTo && soldTo === shippingAddress.shipTo;

  const deleteShippingAddressMutation = useDeleteShippingAddressMutation();

  const deleteShippingAddress = () => {
    if (shippingAddress.xcAddressId) {
      deleteShippingAddressMutation.mutate(Number(shippingAddress.shipTo), {
        onSuccess: () => {
          setOpenDeleteDialog(false);
          setOpenDeleteConfirmationDialog(true);
        },
      });
    }
  };

  return (
    <>
      <div className="flex flex-row space-y-3 border-gray-100 bg-transparent p-5 shadow hover:shadow-lg md:space-y-5 md:p-6">
        <div className="flex-auto gap-3 text-gray-500 md:flex-row md:items-center md:gap-6">
          <h3 className="font-title text-xl font-bold uppercase">
            {shippingAddress?.organization}
          </h3>
          {!!shippingAddress?.shipTo && (
            <div>{`#${shippingAddress?.shipTo} `}</div>
          )}
          <p className="text-sm font-medium md:text-base">
            {shippingAddress?.streetAddress}, {shippingAddress?.locality},{" "}
            {shippingAddress?.region},{" "}
            {(shippingAddress?.county?.length ?? 0) > 0
              ? shippingAddress?.county + ", "
              : ""}
            {shippingAddress?.postalCode}
            <br />
            <span className="font-bold">Phone:</span>{" "}
            {shippingAddress.phoneNumber}
          </p>
          {!shippingAddress?.default ? (
            <Button
              variant="ghost"
              className="p-1 font-bold hover:bg-gray-200"
              onClick={() =>
                updateShippingAddressMutation.mutate({
                  shipTo: shippingAddress.shipTo,
                  default: true,
                })
              }
              data-button-action="Company Profile Set Defalut Shipping Address"
            >
              Set Default
            </Button>
          ) : (
            <p className="p-1 font-bold text-brand-secondary">Default</p>
          )}
        </div>
        {!isSameAsBilling && isAdminOrOsr && (
          <div className="flex w-20 flex-col items-center gap-2 text-center">
            <Button
              variant="ghost"
              className="hover:bg-gray-200"
              onClick={() => setOpenShippingAddressDialog(true)}
              data-button-action="Company Profile Open Edit Shipping Address Dialog"
            >
              <span className="sr-only">Edit shipping address</span>
              <MdOutlineEdit className="text-2xl" />
            </Button>

            <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="hover:bg-gray-200"
                  data-button-action="Company Profile Delete Shipping Address Dialog"
                >
                  <span className="sr-only">
                    Request deletion of shipping address
                  </span>

                  <MdOutlineDelete className="text-2xl" />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Shipping Address Delete Request</DialogTitle>

                  <DialogDescription>
                    Are you sure you want to request this shipping address
                    deletion?
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose
                    asChild
                    disabled={deleteShippingAddressMutation.isPending}
                  >
                    <NewButton variant="outline">Cancel</NewButton>
                  </DialogClose>

                  <NewButton
                    onClick={deleteShippingAddress}
                    disabled={deleteShippingAddressMutation.isPending}
                  >
                    Confirm
                  </NewButton>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog
              open={openDeleteConfirmationDialog}
              onOpenChange={setOpenDeleteConfirmationDialog}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sent Request</DialogTitle>

                  <DialogDescription>
                    Your address deletion request has been sent to the
                    Webmaster. You will hear back from them shortly.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose asChild>
                    <NewButton>OK</NewButton>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      <AddressDialog
        open={openShippingAddressDialog}
        setOpenAddressDialog={setOpenShippingAddressDialog}
        setOpenAddressSuggestionDialog={setOpenShippingAddressSuggestionDialog}
        setAddress={setAddress}
        setAddressCheckSuggestions={setAddressCheckSuggestions}
        isShippingAddress={true}
        isShippingAddressUpdate={true}
        address={shippingAddress}
      />

      {!!addressCheckSuggestions && !!address && (
        <AddressSuggestionDialog
          open={openShippingAddressSuggestionDialog}
          setOpenAddressSuggestionDialog={
            setOpenShippingAddressSuggestionDialog
          }
          setOpenAddressDialog={setOpenShippingAddressDialog}
          setAddressCheckSuggestions={setAddressCheckSuggestions}
          addressCheckSuggestions={addressCheckSuggestions}
          isShippingAddress={true}
          isShippingAddressUpdate={true}
          address={address}
        />
      )}
    </>
  );
};

export default ShippingAddressCard;
