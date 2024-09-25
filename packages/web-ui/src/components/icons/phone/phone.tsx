import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Phone = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
      <path d="M10 8L9 3.5H3.502l-.002.258c0 3.057.82 5.923 2.25 8.39a16.824 16.824 0 006.103 6.101 16.665 16.665 0 008.39 2.251h.257V15L16 14l-1.742 1.744a13.451 13.451 0 01-6.002-6.002L10 8z" />
    </svg>
  );
};
