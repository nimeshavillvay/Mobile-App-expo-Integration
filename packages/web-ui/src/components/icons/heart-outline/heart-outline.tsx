import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const HeartOutline = ({
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
      <path d="M12 5.376c6.504-6.63 17.654 5.681 0 15.624-17.654-9.942-6.504-22.253 0-15.624z" />
    </svg>
  );
};
