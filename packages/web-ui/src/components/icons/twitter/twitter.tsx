import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Twitter = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
      <path d="M17.75 3h3.067l-6.7 7.658L22 21.078h-6.172l-4.833-6.32-5.532 6.32H2.395l7.167-8.192L2 3h6.328l4.37 5.777L17.75 3zm-1.075 16.242h1.7L7.404 4.74H5.582l11.093 14.503z" />
    </svg>
  );
};
