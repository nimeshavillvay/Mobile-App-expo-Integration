import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Bell = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
      <path d="M8.007 17.732a4 4 0 007.986 0M3.5 17.5h17v-1.25L18.906 13l-.213-4.175C18.515 5.282 15.571 2.5 12 2.5c-3.571 0-6.515 2.782-6.693 6.325L5.094 13 3.5 16.25v1.25z" />
    </svg>
  );
};
