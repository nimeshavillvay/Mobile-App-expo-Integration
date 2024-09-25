import { Skeleton } from "@repo/web-ui/components/ui/skeleton";

// TODO: Implement Loading Skeleton after real API integration
const DetailedOrderLoading = () => {
  return (
    <div className="flex flex-col">
      <Skeleton className="mb-4 h-96" />
      <Skeleton className="h-48" />
    </div>
  );
};

export default DetailedOrderLoading;
