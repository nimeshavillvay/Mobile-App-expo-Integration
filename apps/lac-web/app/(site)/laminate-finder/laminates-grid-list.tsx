import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import { Suspense, type ComponentProps } from "react";
import LaminateCard from "./laminate-card";

const LaminateCardSkeleton = () => (
  <div className="overflow-hidden rounded-lg bg-white shadow-md">
    <Skeleton className="aspect-square w-full" />
  </div>
);

const LaminateCardWrapper = ({
  product,
  token,
  groupId,
}: {
  readonly product: ComponentProps<typeof LaminateCard>["product"];
  readonly token: string;
  readonly groupId: string;
}) => (
  <Suspense fallback={<LaminateCardSkeleton />}>
    <LaminateCard product={product} token={token} groupId={groupId} />
  </Suspense>
);

export const LaminatesGridList = ({
  products,
  token,
}: {
  readonly products: {
    prop: ComponentProps<typeof LaminateCard>["product"];
    info: { groupId: string };
  }[];
  readonly token: string;
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map(({ prop, info }) => (
        <LaminateCardWrapper
          key={info.groupId}
          product={prop}
          token={token}
          groupId={info.groupId}
        />
      ))}
    </div>
  );
};

export const LaminatesGridListSkeleton = () => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    {Array.from({ length: 12 }).map((_, index) => (
      <LaminateCardSkeleton key={index} />
    ))}
  </div>
);
