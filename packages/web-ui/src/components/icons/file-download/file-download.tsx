import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const FileDownload = ({
  className,
  ...delegated
}: ComponentProps<"svg">) => {
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
      <path
        strokeLinecap="square"
        d="M8.5 21.5h-4v-19H13L19.5 9v12.5h-4m-3.5-8v6m2.5-1.75l-2.5 2.5-2.5-2.5M13 3v6h6"
      />
    </svg>
  );
};
