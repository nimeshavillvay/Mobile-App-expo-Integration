import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";
import useSuspensePriceCheck from "@/_hooks/product/use-suspense-price-check.hook";
import { formatNumberToPrice } from "@/_lib/utils";
import { useDeferredValue } from "react";
import { useFormContext } from "react-hook-form";
import type { LaminateAddToCartFormSchema } from "./helpers";

const LaminateItemRowPrice = ({
  token,
  productId,
  quantityFieldIndex,
}: {
  readonly token: string;
  readonly productId: number;
  readonly quantityFieldIndex: number;
}) => {
  const { watch } = useFormContext<LaminateAddToCartFormSchema>();
  const quantity = watch(`quantity.${quantityFieldIndex}`);
  const delayedQuantity = useDebouncedState(quantity);
  const deferredQuantity = useDeferredValue(delayedQuantity);

  const priceCheckQuery = useSuspensePriceCheck(token, [
    { productId, qty: Number(deferredQuantity) },
  ]);

  const priceData = priceCheckQuery.data.productPrices[0];
  const extendPrice =
    Number(deferredQuantity) > 0
      ? formatNumberToPrice(priceData?.extendedPrice)
      : "";

  return `$${extendPrice}`;
};

export default LaminateItemRowPrice;
