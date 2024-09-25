import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const CheckCircleFilled = ({
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
      className={cn("fill-black", className)}
      {...delegated}
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.704 7.43l-.774-.634-4.467 5.46L8.5 12.293 7.793 13l2.744 2.744 5.167-6.314z"
        clipRule="evenodd"
      />
    </svg>
  );
};
