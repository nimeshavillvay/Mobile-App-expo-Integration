import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const MapPin = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
      <path d="M14.498 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      <path d="M19.5 10c0 6.192-7.5 11.5-7.5 11.5S4.5 16.192 4.5 10c0-4.25 3.358-7.5 7.5-7.5 4.142 0 7.5 3.25 7.5 7.5z" />
    </svg>
  );
};
