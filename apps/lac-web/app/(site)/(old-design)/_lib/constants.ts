export const TOKEN_COOKIE = "token";
export const ACCOUNT_TOKEN_COOKIE = "account-token";
export const ACCOUNT_NO_COOKIE = "account-no";
export const ADDRESS_ID_COOKIE = "address-id";

export const QUERY_KEYS = {
  PAGE: "page",
  PAGE_SIZE: "page-size",
  SORT: "sort",
} as const;
export const FILTERS_QUERY_PREFIX = "filter-";

export const BASE_URL = "https://wurthlac.com";
export const SITEMAP_SIZE = 45000;

export const AVAILABLE_AVAILABILITY = "availableAll";
export const BACK_ORDERED_AVAILABILITY = "backOrderAll";

export const AVAILABILITY_STATUSES = {
  IN_STOCK: "inStock",
  NOT_IN_STOCK: "notInStock",
} as const;
