import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Wallet = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
        d="M16.5 8.5H6A2.5 2.5 0 013.5 6m13 2.5h4v12h-8m4-12v-5H6A2.5 2.5 0 003.5 6m0 0v5.5"
      />
      <path
        strokeLinecap="round"
        d="M4.236 14.195A3.5 3.5 0 019.5 17.22v.062a3.5 3.5 0 11-7 0v-.062a3.5 3.5 0 011.736-3.024zM15.5 14.5v-.01m.25.01a.25.25 0 11-.5 0 .25.25 0 01.5 0z"
      />
    </svg>
  );
};
