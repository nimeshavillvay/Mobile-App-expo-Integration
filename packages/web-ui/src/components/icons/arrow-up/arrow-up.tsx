import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const ArrowUp = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
      <path strokeLinecap="square" d="M5.5 10L12 3.5l6.5 6.5M12 20.5V4" />
    </svg>
  );
};
