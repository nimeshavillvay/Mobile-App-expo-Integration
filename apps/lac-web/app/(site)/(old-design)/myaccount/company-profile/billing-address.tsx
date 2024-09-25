"use client";

import useSuspenseBillingAddress from "@/_hooks/address/use-suspense-billing-address.hook";
import useSuspenseIsAdminOrOsr from "@/_hooks/user/use-suspense-is-admin-or-osr.hook";
import type { AddressFormData } from "@/_lib/types";
import { Button } from "@/old/_components/ui/button";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import AddressDialog from "./address-dialog";
import AddressSuggestionDialog from "./address-suggestion-dialog";
import type { AddressCheckSuggestionsWithUuid } from "./types";

const BillingAddress = ({ token }: { readonly token: string }) => {
  const [openBillingAddressDialog, setOpenBillingAddressDialog] =
    useState(false);

  const [
    openBillingAddressSuggestionDialog,
    setOpenBillingAddressSuggestionDialog,
  ] = useState(false);

  const [address, setAddress] = useState<AddressFormData>();
  const [addressCheckSuggestions, setAddressCheckSuggestions] =
    useState<AddressCheckSuggestionsWithUuid>();

  const billingAddressQuery = useSuspenseBillingAddress(token);
  const billingAddress = billingAddressQuery?.data;

  const isAdminOrOsr = useSuspenseIsAdminOrOsr(token);

  return (
    <>
      <div className="border-gray-100 bg-transparent p-3 text-gray-500 shadow hover:shadow-lg">
        <h3 className="font-title text-xl font-bold">Billing Address</h3>
        <div className="flex flex-row gap-5 pt-2">
          <p className="my-auto flex-auto text-sm font-medium md:text-base">
            {billingAddress?.streetAddress}, {billingAddress?.locality},{" "}
            {billingAddress?.region},{" "}
            {billingAddress?.county?.length ?? 0 > 0
              ? billingAddress?.county + ","
              : ""}
            {billingAddress?.countryName}, {billingAddress?.postalCode}
            {billingAddress?.zip4?.length > 0
              ? "- " + billingAddress?.zip4
              : ""}
          </p>
          {isAdminOrOsr && (
            <Button
              variant="ghost"
              className="flex-auto text-center hover:bg-gray-200"
              onClick={() => setOpenBillingAddressDialog(true)}
            >
              <span className="sr-only">Edit Billing Address</span>
              <MdOutlineEdit
                className="text-2xl"
                data-button-action="Company Profile Open Edit Billing Address Dialog"
              />
            </Button>
          )}
        </div>
        <span className="text-sm font-bold md:text-base">Phone:</span>{" "}
        {billingAddress.phoneNumber}
      </div>

      <AddressDialog
        open={openBillingAddressDialog}
        setOpenAddressDialog={setOpenBillingAddressDialog}
        setOpenAddressSuggestionDialog={setOpenBillingAddressSuggestionDialog}
        setAddress={setAddress}
        setAddressCheckSuggestions={setAddressCheckSuggestions}
        isShippingAddress={false}
        isShippingAddressUpdate={false}
        address={billingAddress}
      />

      {!!addressCheckSuggestions && !!address && (
        <AddressSuggestionDialog
          open={openBillingAddressSuggestionDialog}
          setOpenAddressSuggestionDialog={setOpenBillingAddressSuggestionDialog}
          setOpenAddressDialog={setOpenBillingAddressDialog}
          setAddressCheckSuggestions={setAddressCheckSuggestions}
          addressCheckSuggestions={addressCheckSuggestions}
          isShippingAddress={false}
          isShippingAddressUpdate={false}
          address={address}
        />
      )}
    </>
  );
};

export default BillingAddress;
