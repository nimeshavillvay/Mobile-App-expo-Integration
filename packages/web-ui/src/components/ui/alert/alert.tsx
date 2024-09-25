import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "~/lib/cva.config";
import { cn } from "~/lib/utils";

const alertVariants = cva({
  base: "relative flex w-full flex-row items-center gap-2 rounded px-3 py-2.5 text-sm",
  variants: {
    variant: {
      default:
        "bg-wurth-gray-50 text-wurth-gray-800 [&>svg]:stroke-wurth-gray-800",
      destructive: "bg-red-50 text-wurth-red-650 [&>svg]:stroke-wurth-red-650",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Alert = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-1", className)} {...props} />
  ),
);
AlertContent.displayName = "AlertContent";

const AlertTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content
  <h5 ref={ref} className={cn("text-sm font-medium", className)} {...props} />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-xs", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertContent, AlertDescription, AlertTitle };
