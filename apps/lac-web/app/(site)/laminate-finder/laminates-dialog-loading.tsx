import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/web-ui/components/ui/table";

const LaminatesDialogLoading = () => {
  return (
    <div className="my-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">Size</TableHead>
            <TableHead>Stock/EA</TableHead>
            <TableHead className="text-center">QTY</TableHead>
            <TableHead className="text-right font-medium">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 3 }).map((_, index) => (
            <TableRow key={`skeleton_${index}`}>
              <TableCell className="w-40 text-nowrap">
                <Skeleton className="h-10 w-full" />
              </TableCell>
              <TableCell className="text-nowrap">
                <Skeleton className="h-10 w-full" />
              </TableCell>
              <TableCell className="text-right">
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

export default LaminatesDialogLoading;
