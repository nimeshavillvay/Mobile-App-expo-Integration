"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { type ComponentProps } from "react";
import { cva } from "~/lib/cva.config";
import { cn } from "~/lib/utils";

const labelVariants = cva({
  base: "text-sm font-medium leading-none text-wurth-gray-800 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
});

const Label = ({
  className = "",
  ...delegated
}: ComponentProps<typeof LabelPrimitive.Root>) => {
  return (
    <LabelPrimitive.Root
      className={cn(labelVariants(), className)}
      {...delegated}
    />
  );
};

export { Label };
