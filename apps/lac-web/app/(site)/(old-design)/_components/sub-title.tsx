import { cn } from "@/_lib/utils";
import React, { type HTMLAttributes } from "react";

const SubTitle = React.forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, children }, ref) => {
  return (
    <h2
      className={cn(
        "relative w-full border-b border-brand-primary pb-2 pr-3 pt-8 font-wurth text-xl font-medium text-brand-primary",
        className,
      )}
      ref={ref}
    >
      {children}
    </h2>
  );
});
SubTitle.displayName = "SubTitle";

export { SubTitle };
