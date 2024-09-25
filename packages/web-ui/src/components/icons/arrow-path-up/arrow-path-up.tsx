import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const ArrowPathUp = ({
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
        d="M15.5 21.5h-7v-11h-4L12 1.75l7.5 8.75h-4v11z"
      />
    </svg>
  );
};
