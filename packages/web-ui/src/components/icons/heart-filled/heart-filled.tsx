import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const HeartFilled = ({
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
      <path d="M12.245 21.436c8.911-5.019 10.813-10.804 9.279-14.648-.756-1.893-2.337-3.239-4.188-3.654-1.738-.39-3.673.05-5.336 1.55-1.663-1.5-3.598-1.94-5.336-1.55-1.851.415-3.432 1.76-4.188 3.654-1.534 3.844.368 9.63 9.279 14.648l.245.138.245-.138z" />
    </svg>
  );
};
