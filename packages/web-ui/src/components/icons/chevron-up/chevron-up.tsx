import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const ChevronUp = ({
  className,
  ...delegated
}: ComponentProps<"svg">) => {
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
      <path strokeLinecap="square" d="M4 15l8-8 8 8" />
    </svg>
  );
};
