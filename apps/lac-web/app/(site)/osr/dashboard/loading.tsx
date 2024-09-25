import { cn } from "@/_lib/utils";
import { Skeleton } from "@repo/web-ui/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/web-ui/components/ui/table";
import { Fragment } from "react";
import { columnPrimaryRep } from "./constants";

const OSRDashboardCustomersLoading = ({
  selfOnly,
  columnsChecked,
}: {
  readonly selfOnly: boolean;
  readonly columnsChecked: string[];
}) => {
  return (
    <div className="my-5">
      <div className="my-6 hidden flex-row justify-between text-brand-gray-400 md:flex">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-[425px]" />
      </div>

      <div className="flex flex-row justify-center gap-1 py-3 font-bold md:hidden">
        <Skeleton className="h-12 w-24" />
        <Skeleton className="h-12 w-28" />
        <Skeleton className="h-12 w-24" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {columnsChecked &&
              columnsChecked.map((column) => (
                <Fragment key={column}>
                  {column == columnPrimaryRep && selfOnly ? null : (
                    <TableHead
                      className={cn("cursor-pointer hover:text-wurth-gray-800")}
                    >
                      <div className="flex items-center">{column}</div>
                    </TableHead>
                  )}
                </Fragment>
              ))}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={`skeleton_${index}`}>
              {columnsChecked &&
                columnsChecked.map((column) => (
                  <Fragment key={column}>
                    {column == columnPrimaryRep && selfOnly ? null : (
                      <TableCell>
                        <Skeleton className="h-10 w-full" />
                      </TableCell>
                    )}
                  </Fragment>
                ))}
              <TableCell>
                <Skeleton className="h-10 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OSRDashboardCustomersLoading;
