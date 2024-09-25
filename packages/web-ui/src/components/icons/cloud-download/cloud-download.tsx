import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const CloudDownload = ({
  className,
  ...delegated
}: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="17"
      viewBox="0 0 22 17"
      fill="none"
      className={cn("stroke-white", className)}
      {...delegated}
    >
      <path
        d="M16.5 15.494C19.2834 15.3609 21.5 13.016 21.5 10.1429C21.5 7.1842 19.1495 4.78571 16.25 4.78571C15.6775 4.78571 15.1263 4.87923 14.6105 5.05211C13.4881 2.37545 10.8837 0.5 7.85 0.5C3.79071 0.5 0.5 3.85786 0.5 8C0.5 11.3036 2.59316 14.1082 5.5 15.1085M11 9.5V15.494M8.5 13.75L11 16.25L13.5 13.75"
        stroke="white"
        strokeLinecap="square"
      />
    </svg>
  );
};
