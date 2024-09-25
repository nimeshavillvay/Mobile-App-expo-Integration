import { Skeleton } from "@repo/web-ui/components/ui/skeleton";

const OrderTrackingLoading = () => {
  return (
    <div className="container my-4 md:my-0 md:px-0">
      <Skeleton className="h-72 w-full" />
    </div>
  );
};

export default OrderTrackingLoading;
