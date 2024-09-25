import dayjs from "dayjs";

export const QUERY_KEYS = {
  page: "page",
} as const;

export const URL_DATE_FORMAT = "YYYY-MM-DD";

export const INIT_FROM_DATE = dayjs()
  .subtract(1, "year")
  .format(URL_DATE_FORMAT);
export const INIT_TO_DATE = dayjs().format(URL_DATE_FORMAT);
