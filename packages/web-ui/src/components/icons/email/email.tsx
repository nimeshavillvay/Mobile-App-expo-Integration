import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Email = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
      <path d="M21.5 4.5h.5V4h-.5v.5zm0 15v.5h.5v-.5h-.5zm-19 0H2v.5h.5v-.5zm0-15V4H2v.5h.5zm9.5 7.571l-.226.446.226.115.226-.115-.226-.446zM21 4.5v15h1v-15h-1zm.5 14.5h-19v1h19v-1zM3 19.5v-15H2v15h1zM2.5 5h19V4h-19v1zm18.774 1.804l-9.5 4.822.452.891 9.5-4.821-.452-.892zm-9.048 4.822l-9.5-4.822-.452.892 9.5 4.821.452-.891z" />
    </svg>
  );
};
