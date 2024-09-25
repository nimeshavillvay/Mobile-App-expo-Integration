import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const TruckWithClock = ({
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
      <path d="M8.5 16H10m-6.5 0h-2v-6l2-4h4m0 0v8.5m0-8.5V4h13v8M8.4 16.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      <path
        strokeLinecap="square"
        d="M16 13.84V16l1.92 1.92M22 16a6 6 0 11-12 0 6 6 0 0112 0z"
      />
    </svg>
  );
};
