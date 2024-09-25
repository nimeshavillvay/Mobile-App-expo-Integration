import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const ArrowUpRight = ({
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
      <path strokeLinecap="square" d="M18.5 15.5v-10h-10M6 18L18 6" />
    </svg>
  );
};
