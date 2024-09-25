import { cn } from "@/_lib/utils";
import { Input } from "@repo/web-ui/components/ui/input";
import { Label } from "@repo/web-ui/components/ui/label";
import { forwardRef, useId, type ComponentPropsWithoutRef } from "react";

const ALLOWED_KEYS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Backspace",
];

const NumberInputField = forwardRef<
  HTMLInputElement,
  Omit<ComponentPropsWithoutRef<typeof Input>, "id" | "type" | "onKeyDown"> & {
    readonly label: string;
    readonly removeDefaultStyles?: boolean;
  }
>(({ value, className, label, removeDefaultStyles, ...delegated }, ref) => {
  const id = useId();
  const numberInputId = `number-input-${id}`;

  return (
    <div>
      <Label htmlFor={numberInputId} className="sr-only">
        {label}
      </Label>

      <Input
        ref={ref}
        id={numberInputId}
        type="number"
        value={value}
        className={cn(
          !removeDefaultStyles &&
            "flex-1 rounded-sm border-0 p-0 text-center text-lg font-semibold text-wurth-gray-800 shadow-none",
          className,
        )}
        onKeyDown={(event) => {
          if (
            (!ALLOWED_KEYS.includes(event.key) ||
              (value &&
                value.toString().length >= 5 &&
                event.key !== "Backspace") || // Limit to 5 characters
              (value !== undefined &&
                value.toString().length === 0 &&
                event.key === "0")) && // Disable "0" as first character
            !(event.metaKey && (event.key === "c" || event.key === "v")) // Allow Copy & Paste
          ) {
            event.preventDefault();
          }
        }}
        {...delegated}
      />
    </div>
  );
});
NumberInputField.displayName = "NumberInputField";

export default NumberInputField;
