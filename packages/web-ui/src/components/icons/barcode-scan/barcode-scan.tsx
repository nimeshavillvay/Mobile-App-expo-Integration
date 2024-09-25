import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const BarcodeScan = ({
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
        d="M6 22H4.4A2.4 2.4 0 0 1 2 19.6V18m16 4h1.6a2.4 2.4 0 0 0 2.4-2.4V18m0-12V4.4A2.4 2.4 0 0 0 19.6 2H18M6 2H4.4A2.4 2.4 0 0 0 2 4.4V6"
        stroke="#4d4d4d"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M18 9v6M14 9v6M10 9v6M6 9v6"
        stroke="#4d4d4d"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
    </svg>
  );
};
