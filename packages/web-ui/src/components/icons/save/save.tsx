import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Save = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
        d="M7.5 3.5v5h9v-5m-9 17v-8h9v8m-13-17v17h17v-14l-3-3h-14z"
      />
    </svg>
  );
};
