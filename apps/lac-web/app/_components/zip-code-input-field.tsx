import { cn } from "@/_lib/utils";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import NumberInputField from "./number-input-field";

const ZipCodeInputField = forwardRef<
  HTMLInputElement,
  Omit<ComponentPropsWithoutRef<typeof NumberInputField>, "label"> & {
    readonly removeDefaultStyles?: boolean;
  }
>(({ value, className, removeDefaultStyles = true, ...delegated }, ref) => {
  return (
    <NumberInputField
      ref={ref}
      removeDefaultStyles={removeDefaultStyles}
      className={cn(
        "flex-1 rounded-md text-wurth-gray-800 shadow-none",
        className,
      )}
      value={value}
      label="Zip/Postal code"
      onWheel={(e) => (e.target as HTMLInputElement).blur()}
      {...delegated}
    />
  );
});
ZipCodeInputField.displayName = "ZipCodeInputField";

export default ZipCodeInputField;
