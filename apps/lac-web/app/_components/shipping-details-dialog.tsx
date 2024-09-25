"use client";

import FullAddress from "@/_components/full-address";
import ShippingAddressSelector from "@/_components/shipping-adddress-selector";
import useSuspenseBillingAddress from "@/_hooks/address/use-suspense-billing-address.hook";
import useSuspenseShippingAddressList from "@/_hooks/address/use-suspense-shipping-address-list.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import type { Country, ShippingMethod, Token } from "@/_lib/types";
import { Truck } from "@repo/web-ui/components/icons/truck";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";
import { useState, type ReactNode } from "react";

const WEEK_DAYS = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
} as const;

type ShippingDetailsDialogProps = {
  readonly token: Token;
  readonly shippingMethods: ShippingMethod[];
  readonly children?: ReactNode;
  readonly open?: boolean;
  readonly setOpen?: (open: boolean) => void;
  readonly countries: Country[];
};

const ShippingDetailsDialog = ({
  token,
  ...delegated
}: ShippingDetailsDialogProps) => {
  const checkLoginQuery = useSuspenseCheckLogin(token);

  if (
    checkLoginQuery?.data?.status_code === "NOT_LOGGED_IN" ||
    checkLoginQuery.data?.change_password
  ) {
    return null;
  }

  return <ShippingDetailsDialogButton token={token} {...delegated} />;
};

export default ShippingDetailsDialog;

const ShippingDetailsDialogButton = ({
  token,
  shippingMethods,
  children,
  open: externalOpen,
  setOpen: externalSetOpen,
  countries,
}: ShippingDetailsDialogProps) => {
  const shippingAddressListQuery = useSuspenseShippingAddressList(token);
  const billingAddressQuery = useSuspenseBillingAddress(token);
  const checkLoginQuery = useSuspenseCheckLogin(token);

  const defaultAddress = shippingAddressListQuery.data.find(
    (address) => address.default,
  );
  const billingAddress = billingAddressQuery.data;

  const shippingMethod = shippingMethods.find(
    (method) => method.code === defaultAddress?.defaultShipping,
  );

  const [internalOpen, setInternalOpen] = useState(false);

  // This is so that the dialog can be controlled from the parent component
  // if needed
  const open = externalOpen ?? internalOpen;
  const setOpen = externalSetOpen ?? setInternalOpen;

  const capitalizeFirstChar = (text?: string) => {
    return text !== undefined
      ? text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
      : "";
  };

  if (checkLoginQuery.data?.change_password) {
    return (
      <>
        <Truck width={16} height={16} />

        <span className="h-fit px-0 py-0 text-sm font-medium leading-5">
          {capitalizeFirstChar(defaultAddress?.streetAddress)}
        </span>
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button
            variant="ghost"
            size="sm"
            className="h-fit px-0 py-0 text-sm font-medium leading-5"
          >
            <Truck
              width={16}
              height={16}
              data-button-action="Open Shipping Details Dialog"
            />

            <span data-button-action="Open Shipping Details Dialog">
              {capitalizeFirstChar(defaultAddress?.streetAddress)}
            </span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-[26.75rem] gap-3">
        <DialogHeader className="mb-1">
          <DialogTitle>Shipping Details</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex h-fit w-full flex-col rounded-lg border border-wurth-gray-150 p-3">
            <div className="font-light text-wurth-gray-500">
              Wurth Louis Account
            </div>
            <div className="font-semibold">{billingAddress?.soldTo ?? ""}</div>
            <div className="font-semibold">
              {defaultAddress?.organization ?? "No Company"}
            </div>
          </div>

          <div className="flex h-fit w-full flex-row justify-between gap-4 rounded-lg border border-wurth-gray-150 p-3">
            <div className="">
              <div className="font-light text-wurth-gray-500">
                Shipping Address
              </div>
              <div className="font-semibold">
                {!!defaultAddress?.shipTo && (
                  <div>{`#${defaultAddress?.shipTo} `}</div>
                )}
                <FullAddress address={defaultAddress} />
              </div>
            </div>

            <ShippingAddressSelector token={token} countries={countries}>
              <Button
                variant="outline"
                className="px-3 font-bold shadow"
                data-button-action="Open Change Shipping Address Dialog"
              >
                Change
              </Button>
            </ShippingAddressSelector>
          </div>

          <div className="grid h-fit w-full grid-cols-1 divide-y rounded-lg border border-wurth-gray-150">
            <div className="p-3">
              <div className="font-light text-wurth-gray-500">
                Order Ships Via
              </div>
              <div className="font-semibold">
                {shippingMethod?.name ? shippingMethod.name : "Not Available"}
              </div>
            </div>
            <div className="p-3">
              <div className="font-light text-wurth-gray-500">
                Delivery Dates
              </div>
              <div className="font-bold">
                {defaultAddress?.routeInfo?.monday && `${WEEK_DAYS.MONDAY} `}
                {defaultAddress?.routeInfo?.tuesday && `${WEEK_DAYS.TUESDAY} `}
                {defaultAddress?.routeInfo?.wednesday &&
                  `${WEEK_DAYS.WEDNESDAY} `}
                {defaultAddress?.routeInfo?.thursday &&
                  `${WEEK_DAYS.THURSDAY} `}
                {defaultAddress?.routeInfo?.friday && WEEK_DAYS.FRIDAY}

                {!defaultAddress?.routeInfo?.monday &&
                  !defaultAddress?.routeInfo?.tuesday &&
                  !defaultAddress?.routeInfo?.wednesday &&
                  !defaultAddress?.routeInfo?.thursday &&
                  !defaultAddress?.routeInfo?.friday &&
                  "No Delivery Dates"}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            className="font-bold"
            onClick={() => setOpen(false)}
            data-button-action="Close Shipping Details Dialog"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
