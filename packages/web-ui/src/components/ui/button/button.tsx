import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "cva";
import { forwardRef } from "react";
import { cva } from "~/lib/cva.config";
import { cn } from "~/lib/utils";

const buttonVariants = cva({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-black text-white shadow hover:bg-wurth-gray-800",
      secondary: "bg-wurth-red-650 text-white shadow-sm hover:bg-red-800",
      destructive: "bg-orange-600 text-white shadow-sm hover:bg-orange-700",
      outline:
        "border border-wurth-gray-400 bg-white text-wurth-gray-800 hover:border-wurth-gray-800 hover:bg-wurth-gray-50",
      subtle: "bg-wurth-gray-50 text-black hover:bg-wurth-gray-150",
      ghost: "text-black hover:bg-wurth-gray-50",
      link: "text-black hover:text-red-800 hover:underline",
    },
    size: {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded px-3 text-xs",
      lg: "h-10 rounded px-8",
      icon: "h-9 w-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  readonly asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "btnAction",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
