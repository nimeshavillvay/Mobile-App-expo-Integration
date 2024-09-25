"use client";

import Warning from "@/_components/warning";
import useDebouncedState from "@/_hooks/misc/use-debounced-state.hook";

type QuantityWarningProps = {
  readonly quantity: number;
  readonly minimumQuantity: number;
  readonly incrementQuantity: number;
};

const QuantityWarning = ({
  quantity,
  minimumQuantity,
  incrementQuantity,
}: QuantityWarningProps) => {
  const delayedQuantity = useDebouncedState(quantity);

  let errorMessage = "";

  if (delayedQuantity < minimumQuantity) {
    errorMessage = `Please consider minimum order quantity of: ${minimumQuantity}`;
  } else if (delayedQuantity % incrementQuantity !== 0) {
    errorMessage = `This product is sold in multiples of: ${incrementQuantity}`;
  }

  if (!errorMessage) {
    return null;
  }

  return <Warning title="Error" description={errorMessage} />;
};

export default QuantityWarning;
