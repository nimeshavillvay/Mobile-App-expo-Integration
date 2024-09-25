import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const AddToCart = ({
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
        d="M21.25 5.75l-1.75 9.5H6L3.5 2.75H1.75M9.5 7h3.25m0 0H16m-3.25 0V3.75m0 3.25v3.25M9.25 19a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zm9 0a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"
      />
    </svg>
  );
};
