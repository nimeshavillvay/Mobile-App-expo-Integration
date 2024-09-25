export const BASE_URL = "https://wurthlac.com";
export const SESSION_TOKEN_COOKIE = "xid_00924";
export const TOKEN_EXPIRE_COOKIE = "xid_00924_expire";
export const TOKEN_MAX_AGE = 172800;

export const API_URL = process.env.NEXT_PUBLIC_WURTH_LAC_API ?? "";
export const API_HEADERS = {
  "X-AUTH-TOKEN": process.env.NEXT_PUBLIC_WURTH_LAC_API_KEY ?? "",
  "content-type": "application/json",
  accept: "application/json",
} as const;

export const PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
export const SITEMAP_PAGE_SIZE = 25000;

export const PRIVATE_ROUTES = [
  "/osr",
  "/checkout",
  "/confirmation",
  "/myaccount",
];

export const DEFAULT_REVALIDATE = 60 * 10; // 10 minutes

export const SPECIAL_SHIPPING_FLAG = [
  "LONG",
  "NOCO",
  "NOUF",
  "NOUP",
  "YLTL",
] as const;

export const DEFAULT_PLANT = {
  code: "L010",
  name: "Brea, CA",
};

// Availability statuses
export const IN_STOCK = "inStock" as const;
export const LIMITED_STOCK = "limitedStock" as const;
export const NOT_IN_STOCK = "notInStock" as const;
export const NOT_AVAILABLE = "notAvailable" as const;

export const MAX_QUANTITY = 100000 as const;

export const UI_DATE_FORMAT = "ddd, MMM. DD YYYY" as const;

export const INIT_PAGE_NUMBER = "1";

export const INIT_PER_PAGE = "20";

export const QUERY_KEYS = {
  PAGE: "page",
  PER_PAGE: "perPage",
  SORT: "sort",
  SORT_DIRECTION: "sortDirection",
  SEARCH_TEXT: "searchText",
  SELF_ONLY: "selfOnly",
} as const;

export const GTM_PAGE_TYPES = {
  CATEGORY: "category",
  SEARCH: "search",
  PRODUCT: "product",
  HOME: "homepage",
  CONTENT: "content",
  LOGIN: "login_page",
} as const;

export const GTM_ITEM_PAGE_TYPES = {
  CHECKOUT: "checkout",
  CATALOG: "catalog",
  SEARCH: "search",
  RELATED_PRODUCT: "related products",
  PURCHASE_HISTORY: "purchases history",
  ORDER_HISTORY: "order history",
  HOME_PAGE: "home page",
  CART_PAGE: "cart page",
  SHOPPING_LIST: "shopping list",
} as const;

export const GTM_PAGE_TYPE_OTHER = "other";

// Cart config values
export const EMPTY_STRING = "" as const;
export const TRUE_STRING = "T" as const;
export const FALSE_STRING = "F" as const;

export const BACKORDER_ENABLED = "T";
export const BACKORDER_DISABLED = "F";
