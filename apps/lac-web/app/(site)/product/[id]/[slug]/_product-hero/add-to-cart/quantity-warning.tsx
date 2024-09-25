"use client";

import QuantityWarningPrimitive from "@/_components/quantity-warning";
import { type ComponentProps } from "react";
import useAddToCartForm from "../use-add-to-cart-form.hook";

type QuantityWarningProps = Omit<
  ComponentProps<typeof QuantityWarningPrimitive>,
  "quantity"
>;

const QuantityWarning = (props: QuantityWarningProps) => {
  const { watch } = useAddToCartForm();
  const quantity = watch("quantity");

  return <QuantityWarningPrimitive quantity={quantity} {...props} />;
};

export default QuantityWarning;
