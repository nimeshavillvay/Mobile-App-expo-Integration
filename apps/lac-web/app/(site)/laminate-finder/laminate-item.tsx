import NumberInputField from "@/_components/number-input-field";
import useSuspenseCheckAvailability from "@/_hooks/product/use-suspense-check-availability.hook";
import useSuspenseCheckLogin from "@/_hooks/user/use-suspense-check-login.hook";
import { NOT_AVAILABLE } from "@/_lib/constants";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { TableCell, TableRow } from "@repo/web-ui/components/ui/table";
import { Suspense } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { LaminateAddToCartFormSchema } from "./helpers";
import LaminateItemRowPrice from "./laminate-item-row-price";
import NotAvailableOnlineNotice from "./not-available-online-notice";
import NotAvailableOnlineNoticeLoggedOut from "./not-available-online-notice-loggedout";
import RegionalExclusionNotice from "./regional-exclusion-notice";

const LaminateItem = ({
  productId,
  token,
  size,
  quantityFieldIndex,
  isExcludedProduct,
}: {
  readonly productId: number;
  readonly token: string;
  readonly size: string;
  readonly quantityFieldIndex: number;
  readonly isExcludedProduct: boolean;
}) => {
  const { data: checkAvailabilityQuery } = useSuspenseCheckAvailability(token, {
    productId: Number(productId),
    qty: 1,
  });

  const isNotAvailableOnline =
    checkAvailabilityQuery.availableLocations.length === 0 &&
    checkAvailabilityQuery.status === NOT_AVAILABLE;

  const loginCheckResponse = useSuspenseCheckLogin(token);
  const isLoggedIn = loginCheckResponse.data?.status_code === "OK";

  const { control, watch } = useFormContext<LaminateAddToCartFormSchema>();

  const quantity = watch(`quantity.${quantityFieldIndex}`);

  return (
    <TableRow key={productId}>
      <TableCell className="w-40 text-nowrap">{size}</TableCell>
      <TableCell className="text-nowrap">
        Home Branch:{" "}
        <strong className="font-semibold">
          {checkAvailabilityQuery.availableLocations[0]?.amount ?? 0}
        </strong>
        <br />
        Alt Branch:{" "}
        <strong className="font-semibold">
          {checkAvailabilityQuery.availableLocations[1]?.amount ?? 0}
        </strong>
        {!isNotAvailableOnline && isLoggedIn && (
          <RegionalExclusionNotice token={token} productId={productId} />
        )}
        {!isNotAvailableOnline && !isLoggedIn && isExcludedProduct && (
          <NotAvailableOnlineNoticeLoggedOut />
        )}
        {isNotAvailableOnline && <NotAvailableOnlineNotice />}
      </TableCell>
      <TableCell className="text-right">
        <Controller
          control={control}
          name={`quantity.${quantityFieldIndex}`}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <NumberInputField
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
              disabled={isNotAvailableOnline}
            />
          )}
        />
      </TableCell>
      <TableCell className="text-right font-medium">
        {!!quantity && (
          <Suspense
            key={productId}
            fallback={<Skeleton className="h-4 w-full rounded-lg shadow-md" />}
          >
            <LaminateItemRowPrice
              token={token}
              productId={productId}
              quantityFieldIndex={quantityFieldIndex}
            />
          </Suspense>
        )}
      </TableCell>
    </TableRow>
  );
};

export default LaminateItem;
