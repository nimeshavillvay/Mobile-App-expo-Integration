import { cn } from "@/_lib/utils";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";

type UserProfileSkeletonProps = {
  readonly type: "desktop" | "mobile";
};

export const UserProfileSkeleton = ({ type }: UserProfileSkeletonProps) => {
  return (
    <Skeleton
      className={cn(
        "rounded-full",
        type === "mobile"
          ? "size-6 md:hidden"
          : "hidden md:block md:h-7 md:w-40",
      )}
    />
  );
};
