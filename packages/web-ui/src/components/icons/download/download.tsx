import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Download = ({
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
      <path
        strokeLinecap="square"
        d="M20.5 14.5v6h-17v-6m8.5-11V15m-3.5-3l3.5 3.5 3.5-3.5"
      />
    </svg>
  );
};
