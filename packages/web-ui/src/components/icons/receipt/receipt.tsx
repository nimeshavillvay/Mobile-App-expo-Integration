import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Receipt = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
        d="M8.5 7.5h7m-7 4h3m-7-9h15v19L17 19l-2.5 2.5L12 19l-2.5 2.5L7 19l-2.5 2.5v-19z"
      />
    </svg>
  );
};
