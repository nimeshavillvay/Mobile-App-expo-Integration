"use client";

// eslint-disable-next-line no-restricted-imports
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { SEARCH_PARAMS_COOKIE, TOTAL_COOKIE } from "./constants";

type ResultCacherProps = {
  readonly total?: number;
  readonly searchParams?: string;
};

// TODO Delete this component once the search has been optimized
/**
 * This component is used to cache the total and the searchParams as
 * they are not returned in subsequent search pages.
 */
const ResultCacher = ({ total, searchParams }: ResultCacherProps) => {
  const [, setCookie] = useCookies([TOTAL_COOKIE, SEARCH_PARAMS_COOKIE]);

  useEffect(() => {
    if (total) {
      setCookie(TOTAL_COOKIE, total, {
        path: "/search",
      });
    }
  }, [total, setCookie]);

  useEffect(() => {
    if (searchParams) {
      setCookie(SEARCH_PARAMS_COOKIE, searchParams, {
        path: "/search",
      });
    }
  }, [searchParams, setCookie]);

  return null;
};

export default ResultCacher;
