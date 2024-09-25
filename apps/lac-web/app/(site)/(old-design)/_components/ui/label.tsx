"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "cva";
// eslint-disable-next-line no-restricted-imports
import * as React from "react";

import { cn } from "@/_lib/utils";

const labelVariants = cva({
  base: "font-medium text-brand-gray-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
});

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
