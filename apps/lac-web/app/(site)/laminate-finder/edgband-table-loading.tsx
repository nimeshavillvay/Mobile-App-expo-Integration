import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/web-ui/components/ui/table";

const EdgeBandTableLoading = () => {
  return (
    <div className="my-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item #/MFR Part #</TableHead>
            <TableHead className="text-center lg:w-1/6">
              Width x Roll Size
            </TableHead>
            <TableHead className="text-center lg:w-1/4">Price</TableHead>
            <TableHead className="text-center lg:w-1/6">QTY</TableHead>
            <TableHead className="text-right font-medium">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 3 }).map((_, index) => (
            <TableRow key={`skeleton_${index}`}>
              <TableCell>
                <Skeleton className="h-10 w-full" />
              </TableCell>
              <TableCell className="text-nowrap lg:w-1/4">
                <Skeleton className="h-10 w-full" />
              </TableCell>
              <TableCell className="text-right lg:w-1/6">
                <Skeleton className="h-10 w-full" />
              </TableCell>
              <TableCell className="text-right font-medium">
                <Skeleton className="h-10 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EdgeBandTableLoading;
