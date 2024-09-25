import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Truck = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
      <path d="M9.5 16.5h5m-10 0h-2v-6l2-4h4m0 0V15m0-8.5v-2h13v12H19m-9.6.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm10.1 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
  );
};
