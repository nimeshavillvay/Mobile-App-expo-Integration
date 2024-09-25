import { api } from "@/_lib/api";
import { DEFAULT_REVALIDATE } from "@/_lib/constants";
import type { TaxFormItems } from "./types";

export const getTaxFormDetails = async () => {
  return api
    .get("rest/docs/tax-forms", {
      next: {
        revalidate: DEFAULT_REVALIDATE,
      },
    })
    .json<TaxFormItems>();
};
