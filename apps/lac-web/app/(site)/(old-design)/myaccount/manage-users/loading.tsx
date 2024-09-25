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
import { MdAccountBox } from "react-icons/md";

const ManageUsersLoading = () => {
  return (
    <div>
      <h2 className="relative font-wurth text-xl font-medium text-brand-primary">
        Manage Users
      </h2>

      <Separator
        orientation="horizontal"
        className="h-px flex-1 bg-brand-primary"
      />

      <div className="my-5">
        <h6 className="flex font-wurth text-base font-medium text-brand-gray-500">
          <MdAccountBox className="self-center text-2xl leading-none" />
          &nbsp;Update Your Profile
        </h6>
      </div>

      <Table>
        <TableHeader className="border border-brand-gray-200 bg-brand-gray-200">
          <TableRow>
            <TableHead>Email</TableHead>

            <TableHead className="text-center">Permission</TableHead>

            <TableHead className="text-center">Status</TableHead>

            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody className="border border-brand-gray-200">
          <TableRow>
            <TableCell>
              <Skeleton className="h-5 w-[130px]" />
            </TableCell>

            <TableCell>
              <div className="flex justify-center">
                <Skeleton className="h-5 w-20" />
              </div>
            </TableCell>

            <TableCell>
              <div className="flex justify-center">
                <Skeleton className="h-5 w-[100px]" />
              </div>
            </TableCell>

            <TableCell>
              <div className="flex justify-end">
                <Skeleton className="h-5 w-20" />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Skeleton className="mt-5 h-36" />
    </div>
  );
};

export default ManageUsersLoading;
