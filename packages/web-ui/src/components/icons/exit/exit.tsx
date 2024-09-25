import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Exit = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
        d="M9.5 12H20m-4 4.5l4.5-4.5L16 7.5m-4.5 13h-8v-17h8"
      />
    </svg>
  );
};
