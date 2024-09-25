import { cn } from "@/_lib/utils";
import { cva, type VariantProps } from "cva";
import { type HTMLAttributes } from "react";

const badgeVariants = cva({
  base: "py px inline-flex items-center justify-center rounded-sm border border-brand-gray-400 font-bold transition-colors",
  variants: {
    variant: {
      default: "text-brand-gray-400",
      secondary: "border-brand-secondary text-brand-secondary",
      destructive: "border-brand-primary text-brand-primary",
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
