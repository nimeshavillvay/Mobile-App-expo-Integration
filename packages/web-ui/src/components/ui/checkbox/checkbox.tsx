"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> & {
  readonly iconClassName?: string;
};

const Checkbox = ({
  className = "",
  iconClassName = "",
  ...delegated
}: CheckboxProps) => {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer size-3.5 shrink-0 rounded-sm border border-wurth-gray-250 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-wurth-gray-800 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-wurth-gray-800 data-[state=checked]:text-wurth-gray-50",
        className,
      )}
      {...delegated}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <CheckIcon className={cn("size-3", iconClassName)} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};

export { Checkbox };
