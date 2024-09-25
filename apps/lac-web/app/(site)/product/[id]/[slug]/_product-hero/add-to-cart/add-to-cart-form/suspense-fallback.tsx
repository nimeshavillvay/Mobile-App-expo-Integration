"use client";

import NumberInputField from "@/_components/number-input-field";
import { Suspense, type ReactNode } from "react";
import FormContent from "./form-content";

type SuspenseFallbackProps = {
  readonly children: ReactNode;
};

const SuspenseFallback = ({ children }: SuspenseFallbackProps) => {
  return (
    <Suspense
      fallback={
        <FormContent
          formProps={{}}
          decrementButtonProps={{ disabled: true }}
          incrementButtonProps={{ disabled: true }}
          submitButtonProps={{ disabled: true }}
        >
          <NumberInputField label="Quantity" disabled />
        </FormContent>
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseFallback;
