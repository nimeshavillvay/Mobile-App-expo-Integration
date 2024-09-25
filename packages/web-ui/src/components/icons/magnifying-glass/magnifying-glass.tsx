import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const MagnifyingGlass = ({
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
        d="M20.25 20.25L16.3 16.3m2.2-5.3a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
      />
    </svg>
  );
};
