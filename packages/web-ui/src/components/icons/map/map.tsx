import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Map = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
        d="M11.5 6.5h-4m13 5v9H5A2.5 2.5 0 012.5 18m0 0A2.5 2.5 0 015 15.5M2.5 18V6A2.5 2.5 0 015 3.5h2.5v12H5m0 0h2m13.5-8.571C20.5 9.786 17 11.5 17 11.5s-3.5-1.714-3.5-4.571C13.5 5.035 15.067 3.5 17 3.5s3.5 1.535 3.5 3.429z"
      />
    </svg>
  );
};
