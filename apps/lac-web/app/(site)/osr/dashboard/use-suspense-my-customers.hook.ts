import { api } from "@/_lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  columnAccount,
  columnCartItemCount,
  columnCartLastUpdate,
  columnCartSubtotal,
  columnEmailAndPhone,
  columnNameAndCompany,
  columnStreetAddress,
  columnTotalOrders,
} from "./constants";
import type { Customer } from "./types";

type OldCustomer = {
  "country-name": string;
  county: string;
  locality: string;
  organization: string;
  permission: string;
  "phone-number": string;
  region: string;
  "street-address": string;
  "postal-code": string;
  zip4: string;
  billto: string;
  user_id: string;
  total_orders: number;
  email: string;
  subtotal: string;
  date: Date;
  company: string;
  phone: string;
  fullname: string;
  total_items: number;
  sales_rep: string;
};

type OldPagination = {
  db_count: number;
  offset: number;
  perPage: number;
};

const getSortFieldNameForAPI = (sortColumnName: string) => {
  switch (sortColumnName) {
    case columnEmailAndPhone:
      return "email";
    case columnNameAndCompany:
      return "company";
    case columnStreetAddress:
      return "address";
    case columnTotalOrders:
      return "orders_count";
    case columnCartSubtotal:
      return "subtotal";
    case columnCartItemCount:
      return "cart_items_count";
    case columnCartLastUpdate:
      return "date";
    case columnAccount:
    default:
      return "billto";
  }
};

const useSuspenseMyCustomers = (
  token: string,
  {
    searchText,
    sort,
    sortDirection,
    page,
    perPage,
    selfOnly,
  }: {
    searchText: string;
    sort: string;
    sortDirection: string;
    page: number;
    perPage: number;
    selfOnly: boolean;
  },
) => {
  return useSuspenseQuery({
    queryKey: [
      "osr",
      "my-customers",
      token,
      searchText,
      sort,
      sortDirection,
      page,
      perPage,
      selfOnly,
    ],
    queryFn: () =>
      api
        .get("rest/my-account/my-customers", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          searchParams: {
            substring: searchText,
            sort: getSortFieldNameForAPI(sort),
            sort_direction: sortDirection,
            page: page,
            perpage: perPage,
            self_only: selfOnly,
          },
        })
        .json<{ customers: OldCustomer[]; pagination: OldPagination[] }>(),
    select: (data: {
      customers: OldCustomer[];
      pagination: OldPagination[];
    }) => {
      const customers: Customer[] = data.customers.map(
        (customer: OldCustomer) => ({
          countryName: customer["country-name"],
          county: customer.county,
          locality: customer.locality,
          organization: customer.organization,
          permission: customer.permission,
          phoneNumber: customer["phone-number"],
          region: customer.region,
          streetAddress: customer["street-address"],
          postalCode: customer["postal-code"],
          zip4: customer.zip4,
          billTo: customer.billto,
          userId: customer.user_id,
          totalOrders: customer.total_orders,
          email: customer.email,
          subTotal: customer.subtotal,
          date: customer.date,
          company: customer.company,
          phone: customer.phone,
          fullName: customer.fullname,
          totalItems: customer.total_items,
          salesRep: customer.sales_rep,
        }),
      );

      return {
        customers,
        pagination: {
          dbCount: data.pagination?.[0]?.db_count,
          offset: data.pagination?.[0]?.offset,
          perPage: data.pagination?.[0]?.perPage,
        },
      };
    },
  });
};

export default useSuspenseMyCustomers;
