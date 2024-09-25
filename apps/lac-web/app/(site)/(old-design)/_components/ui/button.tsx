import { cn } from "@/_lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "cva";
// eslint-disable-next-line no-restricted-imports
import * as React from "react";

const buttonVariants = cva({
  base: "inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-sm px-3.5 font-wurth text-[15px] font-extrabold uppercase leading-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-brand-primary text-white",
      secondary:
        "border-2 border-brand-secondary bg-white text-brand-secondary",
      outline:
        "border-input bg-background hover:bg-accent hover:text-accent-foreground border shadow-sm",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  readonly asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
