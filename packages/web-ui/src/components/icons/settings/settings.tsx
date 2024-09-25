import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Settings = ({
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
        d="M3.5 7h9.75m7.25 10h-7.75M3.5 17h1.75M13.5 7A3.5 3.5 0 0117 3.5 3.5 3.5 0 0120.5 7a3.5 3.5 0 01-3.5 3.5A3.5 3.5 0 0113.5 7zm-1 10c0 1.934-1.566 3.5-3.5 3.5A3.499 3.499 0 015.5 17c0-1.934 1.566-3.5 3.5-3.5s3.5 1.566 3.5 3.5z"
      />
    </svg>
  );
};
