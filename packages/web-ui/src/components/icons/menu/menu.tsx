import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Menu = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
        stroke="#000"
        strokeLinecap="square"
        d="M2.5 12h19m-19-6.5h19m-19 13h19"
      />
    </svg>
  );
};
