import { Skeleton } from "@repo/web-ui/components/ui/skeleton";

const LaminateCardSkeleton = () => (
  <div className="overflow-hidden rounded-lg bg-white shadow-md">
    <Skeleton className="aspect-square w-full" />
  </div>
);

export const LaminatesGridListSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <LaminateCardSkeleton key={index} />
      ))}
    </div>
  );
};
