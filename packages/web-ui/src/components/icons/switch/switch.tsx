import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Switch = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
      <path d="M7.5 3.5L3.5 7.5L7.5 11.5M16.5 12.5L20.5 16.5L16.5 20.5M4 7.5H20.5M3.5 16.5H20" />
    </svg>
  );
};
