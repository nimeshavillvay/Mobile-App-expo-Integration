import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Profile = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
        strokeLinejoin="round"
        d="M5.875 18.845c1.362-1.824 3.506-2.994 6.125-2.994s4.762 1.17 6.125 2.994M15.5 10a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zm6 2a9.5 9.5 0 10-15.81 7.103A9.464 9.464 0 0012 21.5a9.465 9.465 0 006.31-2.397A9.477 9.477 0 0021.5 12z"
      />
    </svg>
  );
};
