import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const BookmarkFilled = ({
  className,
  ...delegated
}: ComponentProps<"svg">) => {
  return (
    <svg
      width="16"
      height="21"
      viewBox="0 0 16 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-black", className)}
      {...delegated}
    >
      <path
        d="M15.5 19.5V0.5H0.5V19.5L8 15.5L15.5 19.5Z"
        stroke="black"
        strokeLinecap="round"
      />
    </svg>
  );
};
