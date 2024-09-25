import { cn } from "@/_lib/utils";

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-brand-gray-300", className)}
      {...props}
    />
  );
};

export { Skeleton };
