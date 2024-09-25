import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Building = ({
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
        d="M3.5 19.5h11m-11 0v-16h11v4m-11 12h-2m13 0h6m-6 0v-12m0 0h6v12m0 0h2m-12-11h-3m0 4h3"
      />
    </svg>
  );
};
