import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Zap = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
      <path d="M20 10.5h-6.5L16 1.75 4 13.5h6.5L8 22.25 20 10.5z" />
    </svg>
  );
};
