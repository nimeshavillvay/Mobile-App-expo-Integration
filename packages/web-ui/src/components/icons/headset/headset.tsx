import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Headset = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
        d="M19.5 16.5h-1v-7h.984m.016 7a2 2 0 002-2v-3a2 2 0 00-2-2h-.016m.016 7a5 5 0 01-5 5h-3v-2m7.984-10a7.5 7.5 0 00-14.968 0m0 0H5.5v7h-1a2 2 0 01-2-2v-3a2 2 0 012-2h.016z"
      />
    </svg>
  );
};
