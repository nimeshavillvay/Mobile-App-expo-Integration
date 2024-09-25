"use client";

import { changeSearchParams } from "@/_lib/client-helpers";
import { INIT_PAGE_NUMBER, QUERY_KEYS } from "@/_lib/constants";
import { cn, formatNumberToPrice } from "@/_lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/web-ui/components/ui/table";
import dayjs from "dayjs";
import { ArrowDownNarrowWide, ArrowDownWideNarrow } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";
import {
  PER_PAGE,
  columnAccount,
  columnCartItemCount,
  columnCartLastUpdate,
  columnCartSubtotal,
  columnEmailAndPhone,
  columnNameAndCompany,
  columnPermission,
  columnPrimaryRep,
  columnStreetAddress,
  columnTotalOrders,
} from "./constants";
import SignAsCustomerDialog from "./sign-as-customer-dialog";
import TotalCountAndPagination from "./total-count-and-pagination";
import type { Customer } from "./types";
import useSuspenseMyCustomers from "./use-suspense-my-customers.hook";

const MyCustomerDetails = ({
  token,
  searchText,
  selfOnly,
  columnsChecked,
}: {
  readonly token: string;
  readonly searchText: string;
  readonly selfOnly: boolean;
  readonly columnsChecked: string[];
}) => {
  const [signAsCustomerDialogOpen, setSignAsCustomerDialogOpen] =
    useState(false);
  const [signAsCustomerId, setSignAsCustomerId] = useState("");
  const [signAsCustomerEmail, setSignAsCustomerEmail] = useState("");

  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? columnAccount;
  const sortDirection = searchParams.get("sortDirection") ?? "asc";
  const page = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : Number(INIT_PAGE_NUMBER);

  const { data: myCustomersResponse } = useSuspenseMyCustomers(token, {
    searchText: searchText,
    sort: sort,
    sortDirection: sortDirection,
    page: Number(page),
    perPage: PER_PAGE,
    selfOnly: selfOnly,
  });

  const getColumnData = (column: string, customer: Customer) => {
    switch (column) {
      case columnAccount:
        return customer.billTo;
      case columnEmailAndPhone:
        return `${customer.email} ${customer.phone}`;
      case columnNameAndCompany:
        return customer.company;
      case columnStreetAddress:
        return `${customer.streetAddress} ${customer.locality}  ${customer.postalCode} ${customer.region}`;
      case columnPermission:
        return customer.permission;
      case columnPrimaryRep:
        return customer.salesRep;
      case columnTotalOrders:
        return customer.totalOrders > 0 ? customer.totalOrders : null;
      case columnCartSubtotal:
        return parseFloat(customer.subTotal) > 0
          ? formatNumberToPrice(
              parseFloat(parseFloat(customer.subTotal).toFixed(2)),
            )
          : null;
      case columnCartItemCount:
        return customer.totalItems > 0 ? customer.totalItems : null;
      case columnCartLastUpdate:
        return customer.date
          ? dayjs(customer.date.toString()).format("MM/DD/YYYY")
          : "";
    }
  };

  const onChangeSortingParams = (orderBy: string, orderType: string) => {
    changeSearchParams(searchParams, [
      {
        key: QUERY_KEYS.SORT,
        value: orderBy,
      },
      {
        key: QUERY_KEYS.SORT_DIRECTION,
        value: orderType,
      },
      {
        key: QUERY_KEYS.PAGE,
        value: INIT_PAGE_NUMBER,
      },
    ]);
  };

  return (
    <>
      <div className="my-5">
        <TotalCountAndPagination
          isLoading={false}
          page={page}
          totalItems={myCustomersResponse?.pagination.dbCount ?? 0}
        />

        <Table>
          <TableHeader>
            <TableRow>
              {columnsChecked &&
                columnsChecked.map((column) => (
                  <Fragment key={column}>
                    {column == columnPrimaryRep && selfOnly ? null : (
                      <TableHead
                        className={cn(
                          "cursor-pointer hover:text-wurth-gray-800",
                          column == sort && "text-wurth-gray-800",
                        )}
                        onClick={() => {
                          if (column == sort && column !== columnPrimaryRep) {
                            onChangeSortingParams(
                              column,
                              sortDirection === "asc" ? "desc" : "asc",
                            );
                          } else {
                            onChangeSortingParams(column, "asc");
                          }
                        }}
                      >
                        <div className="flex items-center">
                          {column}
                          {sort == column &&
                            column !== columnPrimaryRep &&
                            (sortDirection === "asc" ? (
                              <ArrowDownNarrowWide size={15} />
                            ) : (
                              <ArrowDownWideNarrow size={15} />
                            ))}
                        </div>
                      </TableHead>
                    )}
                  </Fragment>
                ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(myCustomersResponse.pagination.dbCount ?? 0 > 0) &&
              myCustomersResponse?.customers.map((customer) => (
                <TableRow key={customer.userId}>
                  {columnsChecked.map((column) => (
                    <Fragment key={column}>
                      {column == columnPrimaryRep && selfOnly ? null : (
                        <TableCell key={column}>
                          {getColumnData(column, customer)}
                        </TableCell>
                      )}
                    </Fragment>
                  ))}

                  <TableCell
                    className="cursor-pointer underline"
                    onClick={() => {
                      setSignAsCustomerId(customer.userId);
                      setSignAsCustomerEmail(customer.email);
                      setSignAsCustomerDialogOpen(true);
                    }}
                  >
                    Login
                  </TableCell>
                </TableRow>
              ))}

            {myCustomersResponse.pagination.dbCount == 0 && (
              <TableRow>
                <TableCell colSpan={columnsChecked.length + 1}>
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <SignAsCustomerDialog
        userId={signAsCustomerId}
        open={signAsCustomerDialogOpen}
        setOpen={setSignAsCustomerDialogOpen}
        customerEmail={signAsCustomerEmail}
      />
    </>
  );
};

export default MyCustomerDetails;
