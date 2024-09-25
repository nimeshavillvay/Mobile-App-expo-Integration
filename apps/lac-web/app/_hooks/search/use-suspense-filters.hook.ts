import { api } from "@/_lib/api";
import { QUERY_KEYS } from "@/_lib/constants";
import type { Filters } from "@/_lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const ORDER_HISTORY = "Order History";
const PURCHASES = "Purchases";
const FAVORITES = "Favorites";
const CATEGORIES = "Categories";
const LAMINATES = "Laminates";
const FILTER_TYPES = {
  [ORDER_HISTORY]: "O",
  [PURCHASES]: "P",
  [FAVORITES]: "F",
  [CATEGORIES]: "C",
  [LAMINATES]: "L",
} as const;

type Values = {
  [key: string]: string[] | undefined;
};

const useSuspenseFilters = (
  token: string | undefined,
  args:
    | {
        type: typeof ORDER_HISTORY;
        from: string;
        to: string;
      }
    | {
        type: typeof PURCHASES;
        from: string;
        to: string;
        values: Values;
      }
    | {
        type: typeof FAVORITES;
        id: string;
      }
    | {
        type: typeof CATEGORIES;
        id: string;
        values: Values;
      }
    | {
        type: typeof LAMINATES;
        values: Values;
      },
) => {
  return useSuspenseQuery({
    queryKey: ["filters", args, token],
    queryFn: async () => {
      const searchParams = new URLSearchParams();

      const rfData: {
        [attributeId: string]: {
          [valueId: string]: "Y";
        };
      } = {};

      if (args.type === "Categories") {
        for (const [key, values] of Object.entries(args.values)) {
          if (values) {
            for (const value of values) {
              rfData[key] = {
                ...rfData[key],
                [value]: "Y",
              };
            }
          }
        }
      }

      if (args.type === "Laminates") {
        for (const [key, values] of Object.entries(args.values)) {
          if (values) {
            for (const value of values) {
              if (key !== QUERY_KEYS.PER_PAGE) {
                if (key === QUERY_KEYS.SEARCH_TEXT) {
                  searchParams.append("substring", value);
                } else {
                  rfData[key] = {
                    ...rfData[key],
                    [value]: "Y",
                  };
                }
              }
            }
          }
        }
      }

      if (args.type === "Purchases" && args.from && args.to && args.values) {
        searchParams.append("from", args.from);
        searchParams.append("to", args.to);
        for (const [key, values] of Object.entries(args.values)) {
          if (values) {
            for (const value of values) {
              rfData[key] = {
                ...rfData[key],
                [value]: "Y",
              };
            }
          }
        }
      }

      if (args.type === "Order History" && args.from && args.to) {
        searchParams.append("from", args.from);
        searchParams.append("to", args.to);
      }

      return await api
        .post(
          `rest/filters/${FILTER_TYPES[args.type]}${args.type !== "Order History" && args.type !== "Purchases" && args.type !== "Laminates" ? `/${args.id}` : ""}`,
          {
            searchParams,
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined,
            },
            json: {
              rf_data: rfData,
            },
            cache: "no-store",
          },
        )
        .json<Filters[]>();
    },
  });
};

export default useSuspenseFilters;
