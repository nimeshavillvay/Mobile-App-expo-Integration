import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Shop = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
        d="M3.5 12v8.5h17V12m-5.206-3.494a3.3 3.3 0 11-6.589 0l.279-4.728-.294 4.996A3.427 3.427 0 015.268 12c-.68 0-1.294-.245-1.768-.646a2.737 2.737 0 01-.932-2.572L3.5 3.5h17l.932 5.282a2.737 2.737 0 01-.932 2.572c-.474.401-1.088.646-1.768.646a3.428 3.428 0 01-3.422-3.226l-.294-4.996.278 4.728z"
      />
    </svg>
  );
};
