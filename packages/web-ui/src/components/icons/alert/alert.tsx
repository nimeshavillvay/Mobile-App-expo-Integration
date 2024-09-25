import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Alert = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
        d="M12 9.5V14m0 2.49v.01M12 3L2.25 19.5h19.5L12 3z"
      />
    </svg>
  );
};
