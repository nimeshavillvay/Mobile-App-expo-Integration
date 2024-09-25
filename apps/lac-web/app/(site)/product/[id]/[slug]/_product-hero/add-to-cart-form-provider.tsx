"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { addToCartSchema, type AddToCartSchema } from "./helpers";

type AddToCartFormProviderProps = {
  readonly minQuantity: number;
  readonly children: ReactNode;
};

const AddToCartFormProvider = ({
  minQuantity,
  children,
}: AddToCartFormProviderProps) => {
  const methods = useForm<AddToCartSchema>({
    values: {
      quantity: minQuantity,
    },
    resolver: zodResolver(addToCartSchema),
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default AddToCartFormProvider;
