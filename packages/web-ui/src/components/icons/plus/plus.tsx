import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Plus = ({ className, ...delegated }: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={cn("stroke-black", className)}
      {...delegated}
    >
      <path strokeLinecap="square" d="M12 3.5V12m0 0v8.5m0-8.5H3.5m8.5 0h8.5" />
    </svg>
  );
};
