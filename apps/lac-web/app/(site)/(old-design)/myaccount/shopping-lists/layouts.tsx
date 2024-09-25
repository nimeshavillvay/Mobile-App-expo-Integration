import { Skeleton } from "@repo/web-ui/components/ui/skeleton";

export const ShoppingListHeaderSkeleton = () => {
  return (
    <>
      <div className="mx-2 my-5 flex flex-row items-end justify-between">
        <Skeleton className="h-7 w-24 md:h-9 md:w-36" />
        <div className="flex flex-row items-center gap-2">
          <Skeleton className="h-7 w-20 md:h-9 md:w-24" />
          <Skeleton className="h-7 w-20 md:h-9 md:w-24" />
        </div>
      </div>
      <div className="mx-2 my-5 flex flex-row items-center justify-between">
        <Skeleton className="h-5 w-20 md:h-6 md:w-24" />
        <Skeleton className="h-5 w-20 md:h-6 md:w-24" />
      </div>
    </>
  );
};
