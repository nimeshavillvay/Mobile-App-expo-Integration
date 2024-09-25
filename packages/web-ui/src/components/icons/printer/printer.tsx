import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Printer = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
        d="M9.5 10.5h-3m0 3v8h11v-8m-11 0h11m-11 0v4h-4v-11h19v11h-4v-4m-11-11h11v4h-11v-4z"
      />
    </svg>
  );
};
