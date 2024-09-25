import dayjs from "dayjs";

export const UI_DATE_FORMAT = "MM/DD/YYYY" as const;
export const URL_DATE_FORMAT = "YYYY-MM-DD" as const;

export const DURATIONS = [
  { value: "30", label: "30 days" },
  { value: "60", label: "60 days" },
  { value: "90", label: "90 days" },
  { value: "0", label: "Custom" },
] as const;

export const ORDER_STATUS = {
  C: "Cancelled",
  I: "In progress",
  R: "Returned",
  S: "Shipped",
  K: "Credited",
  F: "Fully processed",
} as const;

export const STATUS_COLOR_CLASSES = {
  C: "text-brand-primary",
  I: "text-brand-secondary",
  R: "text-brand-gray-500",
  S: "text-brand-tertiary",
  K: "text-brand-gray-500",
  F: "text-brand-success",
  default: "text-brand-secondary",
} as const;

export const ORDER_TYPES = {
  A: "Inquiry",
  B: "Quotation",
  C: "Order",
  D: "Item proposal",
  E: "Scheduling agreement",
  F: "Scheduling agreement with external service agent",
  G: "Contract",
  H: "Returns",
  I: "Order w/o charge",
  J: "Delivery",
  K: "Credit memo request",
  L: "Debit memo request",
  M: "Invoice",
  N: "Invoice cancellation",
  O: "Credit memo",
  P: "Debit memo",
  Q: "WMS transfer order",
  R: "Goods movement",
  S: "Credit memo cancellation",
  T: "Returns delivery for order",
  U: "Pro forma invoice",
  V: "Purchase Order",
  W: "Independent reqts plan",
  X: "Handling unit",
} as const;

export const SORT_BY_FIELDS = {
  SKU: "orderid",
  ORDER_STATUS: "status",
  ORDER_DATE: "date",
  TOTAL_ITEMS: "total",
};

export const QUERY_KEYS = {
  FROM_DATE: "from",
  TO_DATE: "to",
  PAGE: "page",
  PER_PAGE: "perpage",
  ORDER_BY: "orderBy",
  ORDER_TYPE: "orderType",
  ORDER_STATUS: "orderStatus",
  SORT_TYPE: "sort",
  SORT_DIRECTION: "sort_direction",
  SEARCH_TEXT: "searchText",
} as const;

export const SORTING_DIRECTION = {
  ASC: "asc",
  DESC: "desc",
} as const;

export const SORTING_FILTERS_FOR_MOBILE = [
  {
    title: "Item # / MFR Part #",
    options: [
      {
        title: "Item # / MFR Part # Ascending",
        type: SORT_BY_FIELDS.SKU,
        direction: SORTING_DIRECTION.ASC,
      },
      {
        title: "Item# / MFR Part# Descending",
        type: SORT_BY_FIELDS.SKU,
        direction: SORTING_DIRECTION.DESC,
      },
    ],
  },
  {
    title: "Order Date",
    options: [
      {
        title: "Order Date Ascending",
        type: SORT_BY_FIELDS.ORDER_DATE,
        direction: SORTING_DIRECTION.ASC,
      },
      {
        title: "Order Date Descending",
        type: SORT_BY_FIELDS.ORDER_DATE,
        direction: SORTING_DIRECTION.DESC,
      },
    ],
  },
  {
    title: "Order Total",
    options: [
      {
        title: "Order Total Ascending",
        type: SORT_BY_FIELDS.TOTAL_ITEMS,
        direction: SORTING_DIRECTION.ASC,
      },
      {
        title: "Order Total Descending",
        type: SORT_BY_FIELDS.TOTAL_ITEMS,
        direction: SORTING_DIRECTION.DESC,
      },
    ],
  },
];

export const PAGE_SIZES = ["10", "20", "30", "40"] as const;
export const INIT_PAGE_SIZE = "10" as const;
export const INIT_FROM_DATE = dayjs()
  .subtract(30, "days")
  .format(URL_DATE_FORMAT);
export const INIT_TO_DATE = dayjs().format(URL_DATE_FORMAT);
export const INIT_DURATION = DURATIONS.at(0); // Initial duration is 30 days
export const CUSTOM_DURATION = DURATIONS.at(-1); // Custom duration is the last item in the list
export const INIT_SORT_TYPE = SORT_BY_FIELDS.ORDER_DATE;
export const INIT_SORT_DIRECTION = SORTING_DIRECTION.DESC;
