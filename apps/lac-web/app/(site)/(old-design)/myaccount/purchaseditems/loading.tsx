import Separator from "@/old/_components/separator";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";

const PurchasedItemsLoading = () => {
  return (
    <>
      <div className="px-4 pt-4 md:px-0 md:pt-0">
        <h2 className="relative font-wurth text-xl font-medium text-brand-primary">
          My Purchased Items
        </h2>

        <Separator
          orientation="horizontal"
          className="mb-4 h-px flex-1 bg-brand-primary"
        />
      </div>

      <div className="">
        <Skeleton className="h-[92px]" />

        <Skeleton className="my-6 h-5 w-24" />

        <div className="flex flex-col">
          <Skeleton className="mb-4 h-[279.25px]" />

          <Skeleton className="mb-4 h-48" />
        </div>
      </div>
    </>
  );
};

export default PurchasedItemsLoading;
