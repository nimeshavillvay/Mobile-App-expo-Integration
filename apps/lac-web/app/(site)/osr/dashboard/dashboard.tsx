"use client";

import { changeSearchParams } from "@/_lib/client-helpers";
import { INIT_PAGE_NUMBER, QUERY_KEYS } from "@/_lib/constants";
import { MagnifyingGlass } from "@repo/web-ui/components/icons/magnifying-glass";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@repo/web-ui/components/ui/dropdown-menu";
import { Label } from "@repo/web-ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/web-ui/components/ui/select";
import { useSearchParams } from "next/navigation";
import { Suspense, useId, useState, type ComponentProps } from "react";
import {
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
import OSRDashboardCustomersLoading from "./loading";
import MyCustomerDetails from "./my-customers-details";

const Dashboard = ({ token }: { readonly token: string }) => {
  const id = useId();
  const belongsTo = `belongs-to-${id}`;

  const allColumns = [
    columnAccount,
    columnEmailAndPhone,
    columnNameAndCompany,
    columnStreetAddress,
    columnPermission,
    columnPrimaryRep,
    columnTotalOrders,
    columnCartSubtotal,
    columnCartItemCount,
    columnCartLastUpdate,
  ];

  const [columnsChecked, setColumnsChecked] = useState(allColumns);

  const searchParams = useSearchParams();

  const selfOnly =
    searchParams.get("selfOnly") === "true" ||
    searchParams.get("selfOnly") === null;

  const searchText = searchParams.get("searchText") ?? "";
  const [searchInput, setSearchInput] = useState(searchText);

  const sortedColumns = (columns: string[]) => {
    return allColumns.filter((column) => columns.includes(column));
  };

  const searchOnEnter: ComponentProps<"input">["onKeyDown"] = (event) => {
    if (event.key === "Enter") {
      changeSearchParams(searchParams, [
        {
          key: QUERY_KEYS.SEARCH_TEXT,
          value: searchInput,
        },
        {
          key: QUERY_KEYS.PAGE,
          value: INIT_PAGE_NUMBER,
        },
      ]);
    }
  };

  return (
    <div className="my-5">
      <div className="my-2 grid grid-cols-1 gap-y-2 md:grid-cols-3">
        <div className="col-span-1">
          <div className="flex max-w-56 flex-row items-center">
            <Label htmlFor={belongsTo} className="mr-2">
              View:
            </Label>

            <Select
              value={selfOnly ? "self" : "all"}
              onValueChange={(value) => {
                changeSearchParams(searchParams, [
                  {
                    key: QUERY_KEYS.SELF_ONLY,
                    value: (value === "self").toString(),
                  },
                  {
                    key: QUERY_KEYS.PAGE,
                    value: INIT_PAGE_NUMBER,
                  },
                ]);
              }}
            >
              <SelectTrigger id={belongsTo} className="ui-w-[180px] rounded-md">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self">Assigned to me</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="flex flex-row items-center rounded border border-wurth-gray-250">
            <input
              value={searchInput}
              placeholder="Search all customers"
              className="min-w-0 flex-1 shrink rounded border-0 py-2.5 pl-3.5 text-sm placeholder:text-wurth-gray-400"
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={(event) => searchOnEnter(event)}
            />

            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="mx-0.5 rounded px-2 text-wurth-gray-500"
              onClick={() => {
                changeSearchParams(searchParams, [
                  {
                    key: QUERY_KEYS.SEARCH_TEXT,
                    value: searchInput,
                  },
                  {
                    key: QUERY_KEYS.PAGE,
                    value: INIT_PAGE_NUMBER,
                  },
                ]);
              }}
            >
              <MagnifyingGlass
                className="size-5"
                data-button-action="OSR Search"
              />
            </Button>
          </div>
        </div>

        <div className="col-span-1 text-right">
          <DropdownMenu>
            <DropdownMenuTrigger className="float-end flex items-center gap-1 rounded border px-3 py-2 text-sm">
              Columns
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              {allColumns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column}
                  checked={columnsChecked.includes(column)}
                  onCheckedChange={(checked) => {
                    let columns = [];
                    if (checked) {
                      columns = [...columnsChecked, column];
                    } else {
                      columns = columnsChecked.filter((col) => col !== column);
                    }
                    setColumnsChecked(sortedColumns(columns));
                  }}
                  className="DropdownMenuItemIndicator1"
                >
                  {column}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Suspense
        fallback={
          <OSRDashboardCustomersLoading
            columnsChecked={columnsChecked}
            selfOnly={selfOnly}
          />
        }
      >
        <MyCustomerDetails
          token={token}
          searchText={searchText}
          selfOnly={selfOnly}
          columnsChecked={columnsChecked}
        />
      </Suspense>
    </div>
  );
};

export default Dashboard;
