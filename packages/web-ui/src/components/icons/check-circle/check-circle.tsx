import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const CheckCircle = ({
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
        d="M15 9.5L10.5 15l-2-2m13-1a9.5 9.5 0 11-19 0 9.5 9.5 0 0119 0z"
      />
    </svg>
  );
};
