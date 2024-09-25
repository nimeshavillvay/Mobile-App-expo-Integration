import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const UserGroup = ({
  className,
  ...delegated
}: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("stroke-black", className)}
      {...delegated}
    >
      <path
        strokeLinecap="square"
        d="M15 2.5a4 4 0 010 8m2.5 2.9c3.194 1.045 5.5 3.998 5.5 7.1h-3m-11-10a4 4 0 110-8 4 4 0 010 8zm-8 10C1 16.634 4.582 13 9 13s8 3.634 8 7.5H1z"
      />
    </svg>
  );
};
