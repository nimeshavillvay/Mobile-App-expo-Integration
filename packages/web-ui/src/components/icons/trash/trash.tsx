import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export const Trash = ({ className, ...delegated }: ComponentProps<"svg">) => {
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
      <path d="M5.5 21.5l-.5.016.015.484H5.5v-.5zm13 0v.5h.485l.015-.484-.5-.016zM2.5 5H2v1h.5V5zm19 1h.5V5h-.5v1zM10 10.5V10H9v.5h1zm-1 6v.5h1v-.5H9zm6-6V10h-1v.5h1zm-1 6v.5h1v-.5h-1zM4.5 5.516l.5 16 1-.032-.5-16-1 .032zM5.5 22h13v-1h-13v1zm13.5-.484l.5-16-1-.032-.5 16 1 .032zM19 5H5v1h14V5zM2.5 6H5V5H2.5v1zM19 6h2.5V5H19v1zM9 10.5v6h1v-6H9zm5 0v6h1v-6h-1zM8.681 5.385A3.502 3.502 0 0112 3V2a4.502 4.502 0 00-4.267 3.066l.948.319zM12 3c1.542 0 2.853.998 3.319 2.385l.948-.319A4.502 4.502 0 0012 2v1z" />
    </svg>
  );
};
