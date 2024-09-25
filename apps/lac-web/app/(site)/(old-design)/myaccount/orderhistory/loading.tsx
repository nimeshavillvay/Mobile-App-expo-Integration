import Separator from "@/old/_components/separator";
import { Skeleton } from "@/old/_components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/old/_components/ui/table";
import Link from "next/link";

const OrderHistoryLoading = () => {
  const getTableRowBgColor = (index: number) =>
    index % 2 === 0 ? "bg-white" : "bg-brand-gray-100";

  return (
    <>
      <div className="container py-4 md:px-0 md:py-0">
        <h2 className="relative font-wurth text-xl font-medium text-brand-primary">
          My Orders
        </h2>

        <Separator
          orientation="horizontal"
          className="h-px flex-1 bg-brand-primary"
        />
      </div>

      <div className="flex flex-row items-center md:justify-end md:py-4">
        <Link
          className="btnAction hidden text-nowrap rounded-sm bg-brand-secondary px-4 py-2 text-center font-wurth font-extrabold uppercase text-white md:block"
          href="https://wurthlac.billtrust.com/"
          data-button-action="Pay Your Bill Online"
        >
          Pay Your Bill Online
        </Link>
      </div>

      <div className="space-y-4">
        {/* Selectors section skeleton */}
        <Skeleton className="h-[125px] w-full rounded-sm md:h-[246px]" />

        {/* Order history list section skeleton */}
        <Table className="hidden md:table">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Order Type</TableHead>
              <TableHead className="text-center">Order #</TableHead>
              <TableHead className="text-center">Order Date</TableHead>
              <TableHead className="text-center">Order Total</TableHead>
              <TableHead className="text-center">Order Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {[...Array(3)].map((_, index) => (
              <>
                <TableRow key={index} className={getTableRowBgColor(index)}>
                  <TableCell rowSpan={2}>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Skeleton className="h-5 w-12 rounded-sm" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center">
                      <Skeleton className="h-5 w-20 rounded-sm" />
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center">
                      <Skeleton className="h-5 w-20 rounded-sm" />
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center">
                      <Skeleton className="h-5 w-20 rounded-sm" />
                    </div>
                  </TableCell>

                  <TableCell rowSpan={2}>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Skeleton className="my-2 h-5 w-[100px] rounded-sm" />
                      <Skeleton className="h-8 w-[148px] rounded-sm" />
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow key={index} className={getTableRowBgColor(index)}>
                  <TableCell className="flex flex-col text-center">
                    <div className="flex flex-col items-center justify-center text-center">
                      <h4 className="font-bold">Order By:</h4>
                      <Skeleton className="my-1 h-5 w-[200px] rounded-sm" />
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col items-center justify-center text-center">
                      <h4 className="font-bold">PO#:</h4>
                      <Skeleton className="my-1 h-5 w-20 rounded-sm" />
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col items-center justify-center text-center">
                      <h4 className="font-bold">Job#:</h4>
                      <Skeleton className="my-1 h-5 w-20 rounded-sm" />
                    </div>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Item List */}
      <div className="space-y-4 px-4 md:hidden">
        <Skeleton className="h-[196px] w-full rounded-sm" />
        <Skeleton className="h-[196px] w-full rounded-sm" />
        <Skeleton className="h-[196px] w-full rounded-sm" />
      </div>

      {/* Bottom pagination section skeleton */}
      <div className="hidden flex-row items-center justify-between py-4 md:flex">
        <Skeleton className="h-8 w-20 rounded-sm" />
        <Skeleton className="h-8 w-36 rounded-sm" />
        <Skeleton className="h-8 w-[156px] rounded-sm" />
      </div>
    </>
  );
};

export default OrderHistoryLoading;
