import { type VariantProps } from "cva";
import { type HTMLAttributes } from "react";
import { cva } from "~/lib/cva.config";

import { cn } from "~/lib/utils";

const badgeVariants = cva({
  base: "inline-flex items-center rounded border border-transparent px-2.5 py-0.5 text-xs font-semibold shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2",
  variants: {
    variant: {
      default: "bg-wurth-gray-800 text-white hover:bg-wurth-gray-800/80",
      "default-alt":
        "bg-wurth-gray-50 text-wurth-gray-800 hover:bg-wurth-gray-150/80",
      primary: "bg-wurth-red-650 text-white hover:bg-wurth-red-650/80",
      "primary-alt": "bg-red-50 text-wurth-red-650 hover:bg-red-100/80",
      outline:
        "border-wurth-gray-250 bg-white text-wurth-gray-800 hover:bg-wurth-gray-150/80",
      success: "bg-green-700 text-white hover:bg-green-700/80",
      "success-alt": "bg-green-50 text-green-700 hover:bg-green-100/80",
      warning: "bg-orange-600 text-white hover:bg-orange-600/80",
      "warning-alt": "bg-red-100 text-yellow-700 hover:bg-red-200/80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
};

export { Badge, badgeVariants };
