import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Timetable = ({
  className,
  ...delegated
}: ComponentProps<"svg">) => {
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
        d="M16 11.66V14l2.08 2.08M2.15 9.635l1.584 8.982 6.407-1.13M2.15 9.635l-.674-3.82 13.787-2.432.674 3.82L2.15 9.636zM22.5 14a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
      />
    </svg>
  );
};
