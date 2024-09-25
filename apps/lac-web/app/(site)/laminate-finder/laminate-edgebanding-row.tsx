"use client";

import NumberInputField from "@/_components/number-input-field";
import type { EdgeBanding } from "@/_lib/types";

import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import useSuspenseCheckAvailability from "@/_hooks/product/use-suspense-check-availability.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { NOT_AVAILABLE } from "@/_lib/constants";
import { formatNumberToPrice } from "@/_lib/utils";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { TableCell, TableRow } from "@repo/web-ui/components/ui/table";
import { Suspense, useDeferredValue } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { LaminateAddToCartFormSchema } from "./helpers";
import LaminateItemRowPrice from "./laminate-item-row-price";
import NotAvailableOnlineNotice from "./not-available-online-notice";
import NotAvailableOnlineNoticeLoggedOut from "./not-available-online-notice-loggedout";
import RegionalExclusionNotice from "./regional-exclusion-notice";

const LaminateEdgeBandingRow = ({
  product,
  token,
  quantityFieldIndex,
  formId,
}: {
  readonly formId: string;
  readonly product: EdgeBanding;
  readonly token: string;
  readonly quantityFieldIndex: number;
}) => {
  const { control, watch } = useFormContext<LaminateAddToCartFormSchema>();

  const quantity = watch(`quantity.${quantityFieldIndex}`);
  const delayedQuantity = useDebouncedState(quantity);
  const deferredQuantity = useDeferredValue(delayedQuantity);

  const priceCheckQueryBreakdown = useSuspensePriceCheck(token, [
    {
      productId: product.productId,
      qty: deferredQuantity === undefined ? 1 : Number(deferredQuantity),
    },
  ]);

  const { data: checkAvailabilityQuery } = useSuspenseCheckAvailability(token, {
    productId: Number(product.productId),
    qty: 1,
  });

  const loginCheckResponse = useSuspenseCheckLogin(token);
  const isLoggedIn = loginCheckResponse.data?.status_code === "OK";

  const priceBreakdown =
    priceCheckQueryBreakdown.data?.productPrices[0]?.priceBreakDowns;
  const uom = priceCheckQueryBreakdown.data.productPrices[0]?.priceUnit;

  const isNotAvailableOnline =
    checkAvailabilityQuery.availableLocations.length === 0 &&
    checkAvailabilityQuery.status === NOT_AVAILABLE;

  return (
    <TableRow>
      <TableCell className="font-medium">
        {product.productSku}
        {!isNotAvailableOnline && isLoggedIn && (
          <RegionalExclusionNotice
            token={token}
            productId={product.productId}
          />
        )}
        {!isNotAvailableOnline && !isLoggedIn && product.isExcludedProduct && (
          <NotAvailableOnlineNoticeLoggedOut />
        )}
        {isNotAvailableOnline && <NotAvailableOnlineNotice />}
      </TableCell>
      <TableCell className="font-medium">{product.size}</TableCell>
      <TableCell className="text-right">
        <span className="text-lg font-semibold">
          $
          {formatNumberToPrice(
            priceCheckQueryBreakdown.data?.productPrices[0]?.price,
          )}{" "}
          / {uom}
        </span>
        {priceBreakdown !== undefined &&
          priceBreakdown?.length > 0 &&
          priceBreakdown.map((price, index) => (
            <div className="text-sm text-gray-500" key={index}>
              ${formatNumberToPrice(price.price)}/{uom} for {price.quantity}{" "}
              items
            </div>
          ))}
      </TableCell>
      <TableCell>
        <Controller
          control={control}
          name={`quantity.${quantityFieldIndex}`}
          render={({ field: { onChange, onBlur, value = "", name, ref } }) => (
            <NumberInputField
              form={formId}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              ref={ref}
              name={name}
              min={1}
              step={1}
              className="md:w-[6.125rem]"
              removeDefaultStyles={true}
              label="Quantity"
            />
          )}
        />
        <p className="mt-2 text-center text-sm font-medium text-gray-500">
          {uom}
        </p>
      </TableCell>

      <TableCell className="text-right font-medium">
        {!!quantity && (
          <Suspense
            key={product.productId}
            fallback={<Skeleton className="h-4 w-full rounded-lg shadow-md" />}
          >
            <LaminateItemRowPrice
              token={token}
              productId={product.productId}
              quantityFieldIndex={quantityFieldIndex}
            />
          </Suspense>
        )}
      </TableCell>
    </TableRow>
  );
};

export default LaminateEdgeBandingRow;
