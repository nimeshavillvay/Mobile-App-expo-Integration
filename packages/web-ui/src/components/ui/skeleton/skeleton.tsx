import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

export type SkeletonProps = ComponentProps<"div">;

const Skeleton = ({ className = "", ...delegated }: SkeletonProps) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-zinc-900/10", className)}
      {...delegated}
    />
  );
};

export { Skeleton };
