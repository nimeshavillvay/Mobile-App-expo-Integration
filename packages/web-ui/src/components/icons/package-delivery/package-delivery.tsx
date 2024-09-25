import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const PackageDelivery = ({
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
        d="M3.5 3.5h3V14m3.5 3.5h10.5m-5-9v-4m0 0h-5v9h10v-9h-5zm-5.95 13a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
};
