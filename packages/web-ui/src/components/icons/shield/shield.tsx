import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Shield = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
        d="M9 11.25l2 2 4-4M12 2.5l8.5 2.75v6.662c0 4.973-4.5 7.588-8.5 9.746-4-2.158-8.5-4.773-8.5-9.746V5.25L12 2.5z"
      />
    </svg>
  );
};
