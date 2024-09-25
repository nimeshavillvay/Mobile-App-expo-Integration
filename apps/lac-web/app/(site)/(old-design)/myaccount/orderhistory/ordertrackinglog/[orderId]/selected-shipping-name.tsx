"use client";

import useSuspenseBillingAddress from "@/_hooks/address/use-suspense-billing-address.hook";
import type { Token } from "@/_lib/types";

const SelectedShippingName = ({ token }: { readonly token: Token }) => {
  const billingAddressQuery = useSuspenseBillingAddress(token);

  const billingAddress = billingAddressQuery.data;

  return (
    <div className="font-wurth text-sm font-bold text-black md:font-arial md:font-normal md:text-brand-gray-500">
      {billingAddress?.organization && `${billingAddress?.organization},`}
    </div>
  );
};

export default SelectedShippingName;
