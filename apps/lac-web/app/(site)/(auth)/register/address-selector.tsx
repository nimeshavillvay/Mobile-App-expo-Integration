import { cn } from "@/_lib/utils";
import { CheckCircle } from "@repo/web-ui/components/icons/check-circle";
import { Button } from "@repo/web-ui/components/ui/button";
import { useState } from "react";
import type { ResponseAddress } from "./use-register-new-user-mutation.hook";

type AddressSelectorProps = {
  readonly billingAddresses: ResponseAddress[];
  readonly shippingAddresses: ResponseAddress[];
  readonly clearSuggestions: () => void;
  readonly updateAddress: ({
    billing,
    shipping,
  }: {
    billing?: ResponseAddress;
    shipping?: ResponseAddress;
  }) => void;
  readonly disabled: boolean;
};

const AddressSelector = ({
  billingAddresses,
  shippingAddresses,
  clearSuggestions,
  updateAddress,
  disabled,
}: AddressSelectorProps) => {
  const [selectedBillingAddress, setSelectedBillingAddress] =
    useState<number>();
  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<number>();

  const getAddress = (
    selectedAddress: number | undefined,
    addresses: ResponseAddress[],
  ) => {
    if (
      typeof selectedAddress === "number" &&
      addresses[selectedAddress] !== undefined
    ) {
      return addresses[selectedAddress];
    } else {
      return undefined;
    }
  };

  const onSubmit = () => {
    updateAddress({
      billing: getAddress(selectedBillingAddress, billingAddresses),
      shipping: getAddress(selectedShippingAddress, shippingAddresses),
    });
  };

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-wurth-gray-250 bg-white p-6 shadow-lg">
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-wurth-gray-800">
          Address Conflict
        </h3>

        <p className="text-sm text-wurth-gray-800">
          We found a few possible matches for the address you entered. Please
          select the most accurate one to ensure correct shipping information.
        </p>
      </div>

      <div className="space-y-3">
        {!!billingAddresses.length && (
          <AddressList
            type="Billing"
            addresses={billingAddresses}
            selectedIndex={selectedBillingAddress}
            setSelectedIndex={setSelectedBillingAddress}
            disabled={disabled}
          />
        )}

        {!!shippingAddresses.length && (
          <AddressList
            type="Shipping"
            addresses={shippingAddresses}
            selectedIndex={selectedShippingAddress}
            setSelectedIndex={setSelectedShippingAddress}
            disabled={disabled}
          />
        )}
      </div>

      <div className="flex flex-row items-center justify-end gap-2">
        <Button
          variant="outline"
          onClick={clearSuggestions}
          disabled={disabled}
          data-button-action="Register Update address"
        >
          Update address
        </Button>

        <Button
          disabled={
            (billingAddresses.length > 0 &&
              selectedBillingAddress === undefined) ||
            (shippingAddresses.length > 0 &&
              selectedShippingAddress === undefined) ||
            disabled
          }
          onClick={() => onSubmit()}
          data-button-action="Register Submit address"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddressSelector;

const AddressList = ({
  type,
  addresses,
  selectedIndex,
  setSelectedIndex,
  disabled,
}: {
  readonly type: "Billing" | "Shipping";
  readonly addresses: ResponseAddress[];
  readonly selectedIndex?: number;
  readonly setSelectedIndex: (index: number) => void;
  readonly disabled: boolean;
}) => {
  return (
    <div className="space-y-1">
      <h4 className="text-sm font-medium text-wurth-gray-800">
        {type} {addresses.length > 1 ? "addresses" : "address"}
      </h4>

      <ul className="flex flex-col gap-2">
        {addresses.map((address, index) => (
          <li key={index}>
            <Button
              variant="outline"
              className={cn(
                "flex h-fit w-full flex-row justify-start overflow-hidden rounded-lg border-2 border-wurth-gray-150 p-4",
                selectedIndex === index && "border-wurth-gray-800",
              )}
              onClick={() => setSelectedIndex(index)}
              disabled={disabled}
            >
              <CheckCircle
                className={cn(
                  "size-5 shrink-0 stroke-wurth-gray-150",
                  selectedIndex === index && "stroke-wurth-gray-800",
                )}
                data-button-action="Register Select address"
              />

              <div
                className="flex-1 whitespace-normal text-wrap text-left text-base font-medium text-wurth-gray-800"
                data-button-action="Register Select address"
              >
                {address["street-address"]}, {address.locality},{" "}
                {address.region} {address.county && `, ${address.county} `}
                {address["postal-code"]}
                {address.zip4?.length > 0 && `-${address.zip4}`}
              </div>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
