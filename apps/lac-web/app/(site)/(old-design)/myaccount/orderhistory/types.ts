import type { ORDER_STATUS, ORDER_TYPES } from "./constants";
// Types used in old design
export type MyOrdersOld = {
  order_status: unknown[];
  orderHistoryResponse: OrderHistoryResponse;
};

export type OrderHistoryResponse = {
  content: OrderOld[];
  pageable: Pageable;
  totalElements: number;
  last: boolean;
  totalPages: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
};

export type OrderOld = {
  orderNo: string;
  orderType: OrderType;
  status: OrderStatus;
  orderDate: string;
  orderBy: string;
  po: string;
  jobName: string;
  orderTotal: number;
  tax: number;
  totalAmountWithTax: number;
};

export type Pageable = {
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type Sort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

// Types used in new design
export type MyOrders = {
  orders: Order[];
  pagination: Pagination[];
};

export type Order = {
  orderNo: string;
  orderType: OrderType;
  status: OrderStatus;
  orderDate: string;
  orderBy: string;
  po: string;
  jobName: string;
  orderTotal: string;
  tax: string;
  totalAmountWithTax: string;
  firstName: string;
  lastName: string;
  attnName: string;
};

export type Pagination = {
  db_count: number;
  offset: number;
  perPage: number;
};

export type SortBy =
  | "orderid"
  | "status"
  | "customer"
  | "date"
  | "total"
  | "company"
  | "ponumber"
  | "jobname";

export type SortDirection = "asc" | "desc";

// Common types for both old and new designs
export type OrderStatus = keyof typeof ORDER_STATUS;

export type OrderType = keyof typeof ORDER_TYPES;

export type Option = {
  id: number;
  value: string;
  icon: string | null;
  tooltip: string | null;
  active: boolean;
};
